# Customer Points

A vtex app where customer earn points based on the value spent on their purchases. Based on [Orders Feed Example](https://github.com/vtex-apps/orders-feed-example)

## How this is accomplished?

API it's implemented using Masterdata as storage solution.

An event handler receive status updates from OMS Feed.
Gets relevant information of the updated order from Orders API.
