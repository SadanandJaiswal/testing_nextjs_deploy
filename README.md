# Starting With Project

## Create the necessary Folder
- app
- components
- models
- publi/assets
- styles (add globals.css file and add the styling in that)

## Create files in app folder
- layout.jsx
- page.jsx

### Import Files
- Importing files: '@folder_in_root_directory/filename'
- example: '@styles/globals.css'
- remove / from path in jsconfig.js

## Connect to DB
- make utils folder in root directory
- create database.js file and setup mongoDB connection

## Create auth api
- Create Userr Model
- go to console.cloud.google.com
- create project
- create credential (OAuth)
- create NextAuth
- create session, signIn callbacks of NextAuth

### Go to openssl terminal (online) and run command to generate random secret which will be helpful for encryption/decryption 

## Create Prompt APIs
- create prompt model

### /prompt
- Method : GET
- To List all the available prompts

### /prompt/new
- Method : POST
- Create a new prompt
- Request Body
```
{
    userId: "user098239489220",
    prompt: "Create a simple Calculator in React.js",
    tag: "coding"
}
```

### /prompt/[id]
1. **GET METHOD**
    - To get the details of a particular user along with all the prompts by that particular user

2. **PATCH METHOD**
    - Update the Prompt or Tag of the prompt
    - Request Body
    ```
    {
        prompt: "Create a simple Calculator in React.js, use Chakra ui and it should be fully responsive",
        tag: "coding"
    }
    ```

3. **DELETE METHOD**
    - Delete the prompt


### /users/[id]/posts
- Method : GET
- List Down All Prompt of User with _id:id

### Create The Components in following order
1. **Nav Component**
    - Make sure that Provider is installed
    - Mobile & Desktop both will have different Navbar  
2. **PromptCard Component**
    - Complete the UI 
    - Create handler functions
        1. handleProfileClick : navigate to creator's profile
        2. handleCopy : Copy the prompt to the clipboard
3. **Feed Component**
    - Import PromptCard 
    - Create Search Box
    - List the all the available prompt cards
    - Create handler functions
        1. handleSearchChange : Change the value of the Search Box
        2. filterPrompts : filter the prompt cards that contain the search query
        3. handleTagClick : Changes the Search to the selected tag, to list the prompts with that tag
4. **Form Component**
    - This Form Will be used in creating new prompt the updating the existing prompt
5. **Profile Component**
    - Heading which will contain the User Name if user is not the current user
    - If user is the current user then It will show My Profile
    - All the prompts with there tag will be listed bellow