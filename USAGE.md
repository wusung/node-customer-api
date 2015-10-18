How to use
==========

##Scenario
An insurance company needs a system to manage their customer data.  A software engineering team is working on the story below.

*As a system user, I want to add new customer data into the system. After added, I can view a certain customer, and a customer list. Of course, I am also able to modify the data as well as remove it from the system.* 

## Demo site
You can see demo site here. https://demo-customer-api.herokuapp.com/rest/customer

## Instructions
Strongly suggest you use curl utility to test the following codes.

### Creating a single customer
```
curl -H "Content-Type: application/json" -XPOST https://demo-customer-api.herokuapp.com/rest/customer -u franky@gmail.com:1234 -d '{
    "firstname": "Walden",
    "lastname": "David E.",
    "address": "3744 Jásd Izabella u. 70., Hungary",
    "email": "DavidEWalden@virginiabeachbar.hu",
    "phone": "(31) 382-976"
}
'
```

### Updating a single customer
```
curl -H "Content-Type: application/json" -XPUT https://demo-customer-api.herokuapp.com/rest/customer/2 -u franky@gmail.com:1234 -d '{
    "firstname": "Jones 22",
    "lastname": "Charlie 22",
    "address": "9349 Fern Way Otumoetai Tauranga 829, New Zealand 22",
    "email": "CharlieJJones@rewardupgrade.co.nz",
    "phone": "(134) 7630-935"
}
'
```

### Deleting a single customer
```
curl -XDELETE https://demo-customer-api.herokuapp.com/rest/customer/1 -u franky@gmail.com:1234
```

### Reading a single customer
```
curl -XGET https://demo-customer-api.herokuapp.com/rest/customer/50 -u franky@gmail.com:1234
```

### Listing all customers
```
curl -XGET https://demo-customer-api.herokuapp.com/rest/customer -u franky@gmail.com:1234
```

### Login - getting a login token.
> Only authenticated can use the web APIs or it will prompt the users inputting username and password. After login success, the system will assign a token id for a user.

### Logout - destroying a login token.
```
curl -XGET https://demo-customer-api.herokuapp.com/rest/logout -u franky@gmail.com:1234
```
