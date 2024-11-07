# “Special Shipping” App Template Overview
“Special Shipping” is a template for an application that:
* Allows customers to select unique shipping options with custom rates during checkout. The logic controlling whether customers see this option is easily adjustable and can involve any criteria—whether in-memory or network calls (though keeping it simple is advised to avoid latency issues).
* Manages all orders made with these special shipping options in a CMS collection. Merchants can easily access this collection to view orders with special shipping, track rates, destinations, and more, enabling them to manage these orders differently from standard ones.
* The collection is created automatically when the app is installed, and the data structure is extendable.

