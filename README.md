
# Problem Statement

Mini Peerfives allows users to reward other people with peerfives (P5) points.

Understand 2 terms:

P5 - Points that can be given to others
Rewards - Points that are earned and can not be given to others

# after cloning the repo

cd backend

npm i

npm run dev

# new terminal

cd frontend

yarn

yarn run dev

# Completed


Entities/Models


User


ID - string
Name - string
P5 - object
{
    balance: number,
    history: Array<P5History>
}
Reward - object
{
    balance: number,
    history: Array<RewardHistory>
}
P5History
Datetime stamp
Amount - number
Given to (User ID) - string
RewardHistory
Datetime stamp
Amount - number
Given by (User ID) - string

REST APIs

User - Create, edit
P5 - Create, read, delete
Reward - Read

Routes

New User (route = /new)

View User (route = /:id)

P5 History (route = /:id/p5)

New Reward (route = /:id/rewards/new)




