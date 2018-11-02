import graphene
from graphene_django import DjangoObjectType
from django.shortcuts import get_object_or_404
from accounts.models import User, Emp, Biz
from django.contrib.auth import authenticate, logout
from django.contrib.auth import logout as auth_logout
from django.contrib.auth import login as auth_login
from django.utils import timezone
import random
import string
from django.contrib.sessions.backends.db import SessionStore

def get_user(info):
    token = info.context.session.get('token')

    if not token:
        return

    try:
        user = User.objects.get(token=token)
        return user
    except:
        raise Exception('User not found!')

class UserType(DjangoObjectType):
    class Meta:
        model = User

class EmpType(DjangoObjectType):
    class Meta:
        model = Emp

class BizType(DjangoObjectType):
    class Meta:
        model = Biz



class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        firstName = graphene.String(required=True)
        lastName = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)
        pos = graphene.String(required=True)

    def mutate(self, info, firstName, lastName, password, email, pos):
        user = User(
            email=email,
            last_name=lastName,
            first_name = firstName,
            pos = pos
        )
        user.set_password(password)
        user.save()

        return CreateUser(user=user)

class Login(graphene.Mutation):
    user = graphene.Field(UserType)
    pos = graphene.String()
    biz = graphene.Field(BizType)

    class Arguments:
        email = graphene.String()
        password = graphene.String()

    def mutate(self, info, email, password):
        user = authenticate(username=email, password=password)
        pos = user.pos
        if pos == "owner":
            biz = get_object_or_404(Biz, owner_id=user.id)
            print(biz.name)
        if not user:
            raise Exception('Invalid username or password!')
        info.context.session['token'] = user.token
        info.context.session['pos'] = user.pos
        info.context.session['biz'] = biz.id
        print(info.context.session.get('biz'))
        #auth_login(info.context, user)
        return Login(user=user, pos=pos, biz=biz)

class Logout(graphene.Mutation):
    ok = graphene.Boolean()
    class Arguments:
        user =graphene.Int()

    def mutate(self, info, user):
        print(info.context.session.get('biz'))
        auth_logout(info.context)
        return Logout(ok=True)
        

class CreateEmp(graphene.Mutation):
    id = graphene.Int()
    emp = graphene.Field(EmpType)
    biz = graphene.Field(BizType)
    user = graphene.Int()
    
    

    class Arguments:
        sundayStart = graphene.Int()
        sundayEnd = graphene.Int()
        mondayStart = graphene.Int()
        mondayEnd = graphene.Int()
        tuesdayStart = graphene.Int()
        tuesdayEnd = graphene.Int()
        wednesdayStart = graphene.Int()
        wednesdayEnd = graphene.Int()
        thursdayStart = graphene.Int()
        thursdayEnd = graphene.Int()
        fridayStart = graphene.Int()
        fridayEnd = graphene.Int()
        saturdayStart = graphene.Int()
        saturdayEnd = graphene.Int()
        code = graphene.String()
        user = graphene.Int()

    def mutate(self, info, user, code, sundayStart, sundayEnd, mondayStart, mondayEnd,tuesdayStart, tuesdayEnd, wednesdayStart, wednesdayEnd,thursdayStart, thursdayEnd,fridayStart, fridayEnd,saturdayStart, saturdayEnd):
        user = get_object_or_404(User, id=user)
        biz  = Biz.objects.filter(code=code).first()
        if not biz:
            raise Exception('Invalid Code!')
        
        emp = Emp(
            user = user,
            biz = biz,
            sunday_start = sundayStart,
            sunday_end = sundayEnd,
            monday_start = mondayStart,
            monday_end = mondayEnd,
            tuesday_start = tuesdayStart,
            tuesday_end = tuesdayEnd,
            wednesday_start = wednesdayStart,
            wednesday_end = wednesdayEnd,
            thursday_start = thursdayStart,
            thursday_end = thursdayEnd,
            friday_start = fridayStart,
            friday_end = fridayEnd,
            saturday_start = saturdayStart,
            saturday_end = saturdayEnd
        )


        emp.save()

        return CreateEmp(emp=emp, biz=biz, user=user)



class CreateBiz(graphene.Mutation):
    id = graphene.Int()
    name = graphene.String()
    code = graphene.String()
    owner = graphene.Int()
    
    class Arguments:
        name = graphene.String()
        owner = graphene.Int()

    def mutate(self, info, name, owner):
        user = get_object_or_404(User, id=owner)
        code = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits + string.ascii_lowercase) for _ in range(6))
        biz = Biz(
            code = code,
            name = name,
            owner = user
        )

        biz.save()

        return CreateBiz(
            id= biz.id,
            name = biz.name,
            code = biz.code,
            owner = biz.owner
        )




class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    login = Login.Field()
    create_emp = CreateEmp.Field()
    create_biz = CreateBiz.Field()
    logout = Logout.Field()

class Query(graphene.ObjectType):
    me = graphene.Field(UserType)
    users = graphene.List(UserType)
    emps = graphene.List(EmpType,
            biz=graphene.Int())
    bizs = graphene.List(BizType)

    def resolve_users(self, info):
        return User.objects.all()
    
    def resolve_me(self, info):
        user = get_user(info)
        if not user:
            raise Exception('Not logged!')

        return user

    def resolve_emps(self, info, **kwargs):
        print(kwargs)
        biz = kwargs.get('biz')
        if id is not None:
            return Emp.objects.filter(biz=biz)

    def resolve_bizs(self, info):
        return Biz.objects.all()


