import boto3

# set the access key ID and secret access key
access_key_id = ''
secret_access_key = ''

# create a session
session = boto3.Session(
    aws_access_key_id=access_key_id,
    aws_secret_access_key=secret_access_key,
    region_name='us-east-1'
)

# create a DynamoDB client
dynamodb = session.client('dynamodb')

# specify the table name
table_name = 'company'

# scan the table to read all items
response = dynamodb.scan(
    TableName=table_name
)

# extract the items from the response
items = response['Items']

# print the items
for item in items:
    print(item)