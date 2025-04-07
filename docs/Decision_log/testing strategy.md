### Decision

Because of the limited time, the decision was made not to use TDD since proper config for tests is time-consuming so it's better to leave it for after implementing basic features. 

Unit tests should be created according to London School. 

Unit tests should be focused on business logic, and single controllers with mocked database connections.

Integration tests should be created over unit test, and it should cover real database connection. This layer of test piramid is important since significant part of functionalities depends on proper database queries. This tests are going to require setting up dedicated testing environemnt with separate database instance.