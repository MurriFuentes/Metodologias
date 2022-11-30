export const usersData= [
    {
        name: "Felix Armenta Guitirrez",
        password: "123",
        email: "Felix@hotmail.com",
        date: "28/11/1998",
        usertype: "USER",
        friends:[ 
            {
                email: "Juan@hotmail.com"
            }
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
    },
    {
        name: "Juan Manuel Felix Rubio",
        password: "abc",
        email: "Juan@hotmail.com",
        date: "20/11/1988",
        usertype: "ADMIN",
        friends:[ 
            {
                email: "Felix@hotmail.com"
            },
        ],
        groups: [
        ],
    }
  ];