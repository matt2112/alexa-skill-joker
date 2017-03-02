rm lambda.zip
cd lambda
zip -r ../lambda.zip *
cd ..
aws lambda update-function-code --function-name jokerAlexaSkill --zip-file fileb://lambda.zip --profile matt
