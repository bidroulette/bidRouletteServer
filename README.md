# bidRouletteServer  

## Bid Roulette Team  

Amy Pierce  
David Tusia  
Miguel Rodriguez  
Jordan Yamada  
Adrian Cosme-Halverson  

### Bid Roulette  

Our server is a hosting service for auctions. Clients can bid on the various items up for auction and the highest bid is saved to our database for later use.

### User Stories  

Title: Security  
User Story Sentence: As a user I want a secure website to bid on items.  
Feature Tasks: Our application will need authentication built in.  
Acceptance: We will have tests designed for the tokens  
Title: Bid Task

User Story Sentence: As a user I want to bid on the featured item. 
Feature Tasks:
User can see current winning bid.
User can enter an initial bid.
User can receive information about other bids.
User can re-bid if their bid is not the highest amount.
User bids must be higher than the current bid.

Acceptance Tests:
Successfully allows user to place bid.
Confirms that users bid is the highest bid.
Rejects a user bid that is not higher than the current bid.
Successfully broadcasts when another bidder outbids them.
Successfully allows user to place subsequent winning bid. 

Title: User puts an item for auction.
User Story sentence : As a user, I want to put an item up for bids.
Feature Tasks : User can generate an auction event that other users can subscribe to.
Acceptance Tests: Successfully generates a room with when a user chooses to place an item for auction.

Title: Users receive randomly chosen items to bid on during the auctions live server
User Story: As a user, I want to see what surprise items that the website has to offer
Feature Tasks: The website generates a random item to post from the database food clients of the site to 
Acceptance Tests: User successfully can join a room an see the items listen for bid.
Acceptance Tests: Current highest bid cannot be changed via a lower bid.

Miguel: Bid Task: Timer 
As a user I want to have a timer so I can auction effectively.
Feature Tasks: 
User can see countdown for timer for auctioned item to end 
User would like to see that they won the bid 
Acceptance Tests:
When counter ends auction ends

Title: User is notified for winning item.
User Story sentence : As a user, I want to be notified of my winning auction.
Feature Tasks : 
On end of auction, a notification is sent to the user with the highest bid. 
User is sent an email notification with the information of the item they won.
Acceptance Tests: User successfully receives an email when they’ve won the auction
