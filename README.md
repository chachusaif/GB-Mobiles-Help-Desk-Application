# Helpdesk

A full-stack helpdesk web application, built from scratch for a client. Customers raise support tickets, and admins receive them and respond, all through an email-style inbox interface.

> **Status:** early development. See the [roadmap](#roadmap) for what is done and what is in progress.

## Overview

The application has two types of user account:

| Role | What they can do |
|------|------------------|
| **Customer** | Submit support tickets and view responses to them, from an admin or an automated reply |
| **Admin** | Receive tickets from customers and send responses |

Both roles use an email-style layout: an inbox of tickets, with each ticket opening into its conversation thread.

## Features

- Separate customer and admin accounts
- Ticket submission from the customer inbox
- Admin inbox for receiving and responding to tickets
- Automated responses to customers
- Passwords hashed before storage
- Persistent storage of accounts and ticket data

## Architecture

- **Front end:** HTML, CSS and JavaScript
- **Back end:** _to be decided_
- **Storage:** a local file for the first release, migrating to cloud storage later

## Roadmap

- [ ] Project plan and page layouts
- [ ] Login and registration page (`index.html`)
- [ ] Customer inbox and ticket submission
- [ ] Admin inbox and responses
- [ ] Automated responses
- [ ] Password hashing
- [ ] File-based storage (first release)
- [ ] Migration to cloud storage

## Getting started

Setup instructions will be added once the back end is in place.

## Project structure

```
public/
  index.html      login / registration
  css/
  js/
```

## Author

Saif Ud-Dean · [github.com/chachusaif](https://github.com/chachusaif)
