# Plant Productions — landing page

Created October 31, 2026. Ready for GitHub Pages; not deployed.

## Preview
Open index.html in your browser. The preview embeds its logo assets. Separate logo files are also included.
The design uses white cards, the approved Plant Productions wordmark, and black/charcoal typography. Poppins and Inter load from Google Fonts, with Arial available offline.

## 1. Create and upload
Sign in to GitHub as cplant7. Create a public repository named plantproductions. Extract this ZIP first; upload index.html, logo.svg, Plant-Productions-Logo.png and parlivue-logo.png to the repository root, then commit. Do not upload the ZIP itself.

## 2. Enable Pages
In the repository, open Settings → Pages. Choose Deploy from a branch, main, /(root), then Save. Wait for deployment.

## 3. Add the domain
First, verify plantproductions.com under your GitHub account Settings → Pages using GitHub's generated TXT record. Then enter plantproductions.com in the repository's Pages → Custom domain field and Save. GitHub creates CNAME automatically; the supplied CNAME file contains the same value.

## 4. Connect DNS
In Network Solutions select Domains → plantproductions.com → Manage → DNS. Older layouts use Advanced Tools → Advanced DNS Records → Manage. Confirm Network Solutions manages the authoritative DNS before editing. Export or record existing entries first. If nameservers point elsewhere, edit at that provider instead.

Set these website records:

| Type | Host | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | cplant7.github.io |

Replace conflicting website records for @ and www, including old AAAA records if present. Keep mail and verification records. Do not change christinaplant.com. Leave TTL at its default.

## 5. Finish
Allow DNS to propagate, then enable Enforce HTTPS in Pages once available. Test both plantproductions.com and www.plantproductions.com.

## ParliVue Pilot
The pilot lives in the parlivue folder and opens at plantproductions.com/parlivue/. The project card links to it.
To update it, replace parlivue/index.html with the new version and commit. The parlivue/src folder and build.py hold the source; `python3 parlivue/build.py` rebuilds parlivue/index.html from them.

## Feedback later
A suggested address is hello@plantproductions.com. It has not been created or tested. Once the mailbox or forwarding works, add a Feedback mailto link. No messages are collected by this page.

## Official setup references
- GitHub Pages publishing: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- GitHub custom domain and DNS: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- Domain verification: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages
- Network Solutions DNS: https://www.networksolutions.com/help/article/manage-dns-adns-records
