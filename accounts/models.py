from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin
)
from django.conf import settings
from django.db import models
from django.utils import timezone



class UserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError('Users must have an email address')


        user = self.model(
            email=self.normalize_email(email),
            first_name = first_name,
            last_name = last_name,
            pos = pos,
        )

        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, first_name, last_name, password):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email,
            first_name,
            last_name,
            password
        )
        user.is_staff = True
        user.is_superuser = True
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    first_name = models.CharField(max_length=40, null=True, blank=True)
    last_name = models.CharField(max_length=140, null=True, blank=True)
    date_joined = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    pos = models.CharField(max_length=4, null=True) 
    token = models.CharField(max_length=40, null=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def save(self, *args, **kwargs):
        if not self.token:
            self.token = binascii.hexlify(os.urandom(20)).decode()
        return super().save(*args, **kwargs)

    def get_full_name(self):
        # The user is identified by their email address
        return self.email

    def get_short_name(self):
        # The user is identified by their email address
        return self.first_name

    def __str__(self):              # __unicode__ on Python 2
        return self.first_name

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_superuser


class Biz(models.Model):
    owner = models.ForeignKey(to=settings.AUTH_USER_MODEL, blank=True, null=True, related_name='owner', on_delete=models.CASCADE)
    name = models.CharField(null=False, blank=False, max_length=100)
    created = models.DateTimeField(default=timezone.now)
    code = models.CharField(max_length=6, null=False, default='')

class Emp(models.Model):
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, blank=True, null=True, related_name='emp', on_delete=models.CASCADE)
    biz = models.ForeignKey(Biz, blank=True, null=True, related_name='biz', on_delete=models.CASCADE)
    created = models.DateTimeField(default=timezone.now)
    
    ONE = 100
    ONEFIF = 115
    ONEHALF = 130
    ONEFORT = 145
    TWO = 200
    TWOFIF = 215
    TWOHALF = 230
    TWOFORT = 245
    THREE = 300
    THREEFIF = 315
    THREEHALF = 330
    THREEFORT = 345
    FOUR = 400
    FOURFIF = 415
    FOURHALF = 430
    FOURFORT = 445
    FIVE = 500
    FIVEFIF = 515
    FIVEHALF = 530
    FIVEFORT = 545
    SIX = 600
    SIXFIF = 615
    SIXHALF = 630
    SIXFORT = 645
    SEVEN = 700
    SEVENFIF = 715
    SEVENHALF = 730
    SEVENFORT = 745
    EIGHT = 800
    EIGHTFIF = 815
    EIGHTHALF = 830
    EIGHTFORT = 845
    NINE = 900
    NINEFIF = 915
    NINEHALF = 930
    NINEFORT = 945
    TEN = 1000
    TENFIF = 1015
    TENHALF = 1030
    TENFORT = 1045
    ELEVEN = 1100
    ELEVENFIF = 1115
    ELEVENHALF = 1130
    ELEVENFORT = 1145
    TWELVE = 1200
    TWELVEFIF = 1215
    TWELVEHALF = 1230
    TWELVEFORT = 1245
    THIRTEEN = 1300
    THIRTEENFIF = 1315
    THIRTEENHALF = 1330
    THIRTEENFORT = 1345
    FOURTEEN = 1400
    FOURTEENFIF = 1415
    FOURTEENHALF = 1430
    FOURTEENFORT = 1445
    FIFTEEN = 1500
    FIFTEENFIF = 1515
    FIFTEENHALF = 1530
    FIFTEENFORT = 1545
    SIXTEEN = 1600
    SIXTEENFIF = 1615
    SIXTEENHALF = 1630
    SIXTEENFORT = 1645
    SEVENTEEN = 1700
    SEVENTEENFIF = 1715
    SEVENTEENHALF = 1730
    SEVENTEENFORT = 1745
    EIGHTEEN = 1800
    EIGHTEENFIF = 1815
    EIGHTEENHALF = 1830
    EIGHTEENFORT = 1845
    NINETEEN = 1900
    NINETEENFIF = 1915
    NINETEENHALF = 1930
    NINETEENFORT = 1945
    TWENTY = 2000
    TWENTYFIF = 2015
    TWENTYHALF = 2030
    TWENTYFORT = 2045
    TWENTYONE = 2100
    TWENTYONEFIF = 2115
    TWENTYONEHALF = 2130
    TWENTYONEFORT = 2145
    TWENTYTWO = 2200
    TWENTYTWOFIF = 2215
    TWENTYTWOHALF = 2230
    TWENTYTWOFORT = 2245
    TWENTYTHREE = 2300
    TWENTYTHREEFIF = 2315
    TWENTYTHREEHALF = 2330
    TWENTYTHREEFORT = 2345
    TWENTYFOUR = 2400
    TWENTYFOURFIF = 2415
    TWENTYFOURHALF = 2430
    TWENTYFOURFORT = 2445

    TIME_CHOICES = (
        (TWENTYFOUR, '12:00 AM'),
        (TWENTYFOURFIF, '12:15 AM'),
        (TWENTYFOURHALF, '12:30 AM'),
        (TWENTYFOURFORT, '12:45 AM'),
        (ONE, '1:00 AM'),
        (ONEFIF, '1:15 AM'),
        (ONEHALF, '1:30 AM'),
        (ONEFORT, '1:45 AM'),
        (TWO, '2:00 AM'),
        (TWOFIF, '2:15 AM'),
        (TWOHALF, '2:30 AM'),
        (TWOFORT, '2:45 AM'),
        (THREE, '3:00 AM'),
        (THREEFIF, '3:15 AM'),
        (THREEHALF, '3:30 AM'),
        (THREEFORT, '3:45 AM'),
        (FOUR, '4:00 AM'),
        (FOURFIF, '4:15 AM'),
        (FOURHALF, '4:30 AM'),
        (FOURFORT, '4:45 AM'),
        (FIVE, '5:00 AM'),
        (FIVEFIF, '5:15 AM'),
        (FIVEHALF, '5:30 AM'),
        (FIVEFORT, '5:45 AM'),
        (SIX, '6:00 AM'),
        (SIXFIF, '6:15 AM'),
        (SIXHALF, '6:30 AM'),
        (SIXFORT, '6:45 AM'),
        (SEVEN, '7:00 AM'),
        (SEVENFIF, '7:15 AM'),
        (SEVENHALF, '7:30 AM'),
        (SEVENFORT, '7:45 AM'),
        (EIGHT, '8:00 AM'),
        (EIGHTFIF, '8:15 AM'),
        (EIGHTHALF, '8:30 AM'),
        (EIGHTFORT, '8:45 AM'),
        (NINE, '9:00 AM'),
        (NINEFIF, '9:15 AM'),
        (NINEHALF, '9:30 AM'),
        (NINEFORT, '9:45 AM'),
        (TEN, '10:00 AM'),
        (TENFIF, '10:15 AM'),
        (TENHALF, '10:30 AM'),
        (TENFORT, '10:45 AM'),
        (ELEVEN, '11:00 AM'),
        (ELEVENFIF, '11:15 AM'),
        (ELEVENHALF, '11:30 AM'),
        (ELEVENFORT, '11:45 AM'),
        (TWELVE, '12:00 PM'),
        (TWELVEFIF, '12:15 PM'),
        (TWELVEHALF, '12:30 PM'),
        (TWELVEFORT, '12:45 PM'),
        (THIRTEEN, '1:00 PM'),
        (THIRTEENFIF, '1:15 PM'),
        (THIRTEENHALF, '1:30 PM'),
        (THIRTEENFORT, '1:45 PM'),
        (FOURTEEN, '2:00 PM'),
        (FOURTEENFIF, '2:15 PM'),
        (FOURTEENHALF, '2:30 PM'),
        (FOURTEENFORT, '2:45 PM'),
        (FIFTEEN, '3:00 PM'),
        (FIFTEENFIF, '3:15 PM'),
        (FIFTEENHALF, '3:30 PM'),
        (FIFTEENFORT, '3:45 PM'),
        (SIXTEEN, '4:00 PM'),
        (SIXTEENFIF, '4:15 PM'),
        (SIXTEENHALF, '4:30 PM'),
        (SIXTEENFORT, '4:45 PM'),
        (SEVENTEEN, '5:00 PM'),
        (SEVENTEENFIF, '5:15 PM'),
        (SEVENTEENHALF, '5:30 PM'),
        (SEVENTEENFORT, '5:45 PM'),
        (EIGHTEEN, '6:00 PM'),
        (EIGHTEENFIF, '6:15 PM'),
        (EIGHTEENHALF, '6:30 PM'),
        (EIGHTEENFORT, '6:45 PM'),
        (NINETEEN, '7:00 PM'),
        (NINETEENFIF, '7:15 PM'),
        (NINETEENHALF, '7:30 PM'),
        (NINETEENFORT, '7:45 PM'),
        (TWENTY, '8:00 PM'),
        (TWENTYFIF, '8:15 PM'),
        (TWENTYHALF, '8:30 PM'),
        (TWENTYFORT, '8:45 PM'),
        (TWENTYONE, '9:00 PM'),
        (TWENTYONEFIF, '9:15 PM'),
        (TWENTYONEHALF, '9:30 PM'),
        (TWENTYONEFORT, '9:45 PM'),
        (TWENTYTWO, '10:00 PM'),
        (TWENTYTWOFIF, '10:15 PM'),
        (TWENTYTWOHALF, '10:30 PM'),
        (TWENTYTWOFORT, '10:45 PM'),
        (TWENTYTHREE, '11:00 PM'),
        (TWENTYTHREEFIF, '11:15 PM'),
        (TWENTYTHREEHALF, '11:30 PM'),
        (TWENTYTHREEFORT, '11:45 PM'),

    )
    sunday_start = models.IntegerField(        
        choices = TIME_CHOICES,
        default = TWENTYFOUR)
    sunday_end = models.IntegerField(
        choices = TIME_CHOICES,
        default = TWENTYFOUR)
    monday_start = models.IntegerField(
        choices = TIME_CHOICES,
        default = TWENTYFOUR)
    monday_end = models.IntegerField(
        choices = TIME_CHOICES,
        default = TWENTYFOUR)
    tuesday_start = models.IntegerField(
        choices = TIME_CHOICES,
        default = TWENTYFOUR)
    tuesday_end = models.IntegerField(
        choices = TIME_CHOICES,
        default = TWENTYFOUR)
    wednesday_start = models.IntegerField(
        choices = TIME_CHOICES,
        default = TWENTYFOUR
    )
    wednesday_end = models.IntegerField(
        choices = TIME_CHOICES,
        default = TWENTYFOUR
    )
    thursday_start = models.IntegerField(
        choices = TIME_CHOICES,
        default = TWENTYFOUR
    )
    thursday_end = models.IntegerField(
        choices = TIME_CHOICES,
        default = TWENTYFOUR
    )
    friday_start = models.IntegerField(
        choices = TIME_CHOICES,
        default = TWENTYFOUR)
    friday_end = models.IntegerField(
        choices = TIME_CHOICES,
        default = TWENTYFOUR
    )
    saturday_start = models.IntegerField(
        choices = TIME_CHOICES,
        default = TWENTYFOUR
    )
    saturday_end = models.IntegerField(
        choices = TIME_CHOICES,
        default = TWENTYFOUR
    )
    