export const usersData= [
    {
        name: "Felix Armenta Guitirrez",
        password: "123",
        email: "Felix@hotmail.com",
        date: "28/11/1998",
        usertype: "ADMIN",
        friends:[ 
            {
                name: "Juan Manuel Felix Rubio",
                email: "Juan@hotmail.com",
            },
        ],
        groups: [
            {
                name: "Familia",
                members: {
                    OwnerEmail: "Felix@hotmail.com",
                    userEmail: "Juan@hotmail.com"
                },
            }, 
        ],
        notifications: [
            {
                type: "friendRequest",
                data: {
                    FromName: "Eva leticia romero",
                    FromEmail: "Eva@hotmail.com",
                },
            }, 
        ],
    },
    {
        name: "Juan Manuel Felix Rubio",
        password: "abc",
        email: "Juan@hotmail.com",
        date: "20/11/1988",
        usertype: "USER",
        friends:[ 
        ],
        groups: [
        ],
        notifications:[
        ],
    },
    {
        name: "Eva leticia romero",
        password: "abc",
        email: "Eva@hotmail.com",
        date: "20/11/1978",
        usertype: "USER",
        friends:[
        ],
        groups: [
        ],
        notifications:[
        ],
    }
  ];