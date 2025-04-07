# Data storage

## Problem analysis

The goal is to store data for API allowing CRUD operations over Star Wars franchise characters. The data structure is yet undefined, though it seems to be possibly more complex than it could be at first glance. 

The possibility of extending data structures and API features is not defined, so it could be assumed that data should be flexible and open to extension, yet it seems to have a rather strict structure.

### Crucial aspcects

- Because of very specialized and small data, the performance should not have a big impact on the decision.
- Because of unspecified requirements and the potential to evolve of project, the selected solution should be flexible, and easy to change.
- Because of very limited time the selected solution should be well known, easy, and quick to implement.

## Options

### PostgreSQL

Pros:
- Well-known and popular. Rich documentation and extensive experience with it make it easy to implement.
- Relations make it relatively easy to maintain and extend potentially well-structured data.

Cons:
 - Defined data structure decreases flexibility, and requires additional time for defining proper data structure.  

### Mongo DB

Pros:
- Not require strict data structure, which gives flexibility.
- Not require complex queries for proper data search, which makes implementation easier

Cons:
 - Less known, which increases the probability of bugs, and increases the time of implementation
- Document-oriented database does not fit well-structured and rich in relations data.

## Decision

### PostgreSQL + Prisma

Neither of the options seems to have a deciding advantage over the other. Because PostgreSQL is better known it seems to fit the needs better. Implementing it alongside Prisma drastically simplifies defining data models, and migrations, which should allow efficient data layer implementation. 