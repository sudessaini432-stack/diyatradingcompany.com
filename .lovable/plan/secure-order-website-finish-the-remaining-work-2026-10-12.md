# Secure Order Website — Finish the Remaining Work

The backend is already secure and live: login accounts, admin/customer roles, products, orders and settings tables with database-level rules are in place. Nothing on your website changed yet — pages still show the same design. This plan finishes the remaining parts on top of the existing design.

## 1. Customer sign-up and login
- Add a login page and a sign-up page (name, email, password) using the existing email/password system.
- Passwords are stored encrypted by the backend, never as plain text.
- Every new sign-up becomes a "customer" automatically — nobody can make themselves an admin from the website.
- Add a small "Login" link in the header (customers only; visitors can browse and order without logging in).

## 2. Order placement
- The quote form ("Get a Quote") will save the enquiry as an order in the database, always starting as "Pending".
- The WhatsApp message will keep opening exactly as now — nothing in the current flow breaks.
- Add a "My Orders" page where a logged-in customer sees only their own orders and their status: Pending → Confirmed → Processing → Shipped → Delivered → Cancelled. The database rules already make it impossible for one customer to see another customer's orders.

## 3. Admin panel at /admin
- Only accounts with the "admin" role can open it. The check runs on the server and in the database rules, not just by hiding buttons.
- Admin can:
  - Add, edit and delete products; change prices; upload/replace product photos; mark products available or unavailable.
  - See all orders and change each order's status.
  - Change website settings (hero title, whether prices show, accepting-orders on/off).
- Customers and visitors see none of this anywhere on the site.
- Admin and login pages will be blocked from Google in robots.txt (already set).

## 4. Products and settings load from the database
- The four product pages will read products from the database instead of the built-in copy — same images, same design, so the site looks identical.
- Admin edits (new product, price change, availability) then appear on the real website immediately.
- If the database is briefly unavailable, the site falls back to the current built-in products so it never breaks.

## 5. Downloadable product catalogue
- A clean catalogue (D-Cut, W-Cut, Box, Loop bags with customization details) that visitors can view/download, with a WhatsApp enquiry link. Only real business information is used.

## 6. Security check
- Test that: /admin is blocked for non-admins, customers cannot see other customers' orders, customers cannot change products/prices/settings, no secret keys appear in the website code, and private pages are not indexed.
- Fix anything found.

## Notes
- Admin access: after the pages are built, sign up with your email on the login page, tell me which email you used, and I will give that account admin rights from the backend (it cannot be done from the website — that is a security feature).
- No keys or settings need to be set manually.
- The domain diyatradingcompony.com is still not purchased, so it cannot be connected yet. That step stays pending until you buy it.
