## Auth Routes
post /login
post /signup
post /logout

## Profile Routes
get /profile/view
patch /profile/edit
patch /profile/changePassword
delete /profile/deleteProfile

## Request Routes
post /request/send/intrested/:id
post /request/send/ignored/:id

post /request/review/accepted/:requestedId
post /request/review/rejected/:requestedId

## userRouter
get /user/requests/received
get /user/connections
get /user/feed

status: ignored, intrested, accepted, rejected