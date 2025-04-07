Proper deployment of production environment should require actions on different steps of process.

1. Developement process:
- Code should be reviewed by other developers and approved.
- Code should be propperly tested by developer and QA specialist.
- Code should have properly implemented piramid of tests

2. CI/CD
- Tests should be run automatically and merging should be blocked if any test fails.
- Proper solutions (backup instances, healthcheks) should be implemented depending on selected provider.

3. Post deployment
- Proper error logging should be implemented.
- Monitoring tools with notification mechanism should be used (Datadog, sentry)