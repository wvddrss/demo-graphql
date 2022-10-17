## Package installation

1. `docker run npalm/graphql-demo -p 8080:8080`
2. create-react-app
3. [https://www.apollographql.com/docs/react/get-started/](https://www.apollographql.com/docs/react/get-started/)
4. install graphql code generator → for type generation. [https://www.the-guild.dev/graphql/codegen/docs/getting-started/installation](https://www.the-guild.dev/graphql/codegen/docs/getting-started/installation)
5. `npm install @mui/base` 
6. `npm install react-router-dom`
7. `npm install -D @graphql-codegen/typescript-react-apollo`
8. `npm install formik`
9. !!`npm install subscriptions-transport-ws` instead of `graphql-ws`

## Process
1. BaseView that contains appbar title


## TDOO
+ list comments
	- write helper for dates
- edit conference view
	+ add comment
	- add talks
	- add speakers
- check subscriptions


## DONE
+ list of conferences
+ add conference
	+ use formik for form validation
	+ write cache after mutatation
+ list of persons
+ add persons
	! name should not be optional
+ list of talks
+ add talks
+ list comments
	- write helper for dates
	- write pager
	+ use subscriptions