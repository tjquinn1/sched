import graphene

import schedules.schema
import accounts.schema
import locations.schema


class Query(accounts.schema.Query, schedules.schema.Query, locations.schema.Query, graphene.ObjectType):
    pass
class Mutation(accounts.schema.Mutation, schedules.schema.Mutation, locations.schema.Mutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)