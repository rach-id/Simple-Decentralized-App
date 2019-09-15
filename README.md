# Dapp
This is based on that election example by ....
## How this is gonna be ?

### What?
Create a simple decentralized trading platform where people can buy something or sell it, working in the following way:
- Selling:
    - You put what u wanna sell
    - If someone also wants to buy that stuff
    - You receive ether 
    - If not, you gonna leave ur request until someone wants it
- Buying:
    - You check all the offers
    - If you like something
    - You buy it via sending money to that person
    - If you don’t and want something precise
    - You leave your request

### Version1:

Contract:
- Public List of Objects:
    - Each object:
        - Name
        - Description
        - Owner
        - Available : bool
        - ID
        - Price
- Objects count
- Buy_object function (Object ID) :
    - Verify object exist
    - Verify price and amount of money sent
    - Procede with the buying
    - Remove the object from the list  ? How ? 
		- Maybe add a field that says its sold or not ..
- Add_Object function:
    - Verify all fields are 3amren
    - Verify duplicate objects 
    - Add it to the list
    - Increment objects Count

UI:
- For starters:
    - Have the main page show a list of objects
    - Buy:
        - Have a button “buy”
    - Add:
        - Takes you to page with a form to fill to add the object

### Progress:
- Exchange contract partly working: Not sure if the money gets transfered (Does but we should specify how much in the code) ... VM Exception while processing transaction: revert (solved)

- When adding item ... Out of Gas occurs : Solved

- Metamask Problem: After getting the instance of web3.. i cant get the account iam using ==> Transactions not working .. (line15, 16 should be in the else ... ToBe Fixed)

- Specifying how much eth to send with the transaciton (line 102 app.js) and how much gas (line 102, 119 app.js)
