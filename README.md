# Upload and share PDF

This allows users to upload pdf's to a server and share the pdf's through a link, the benefit of this is to not needing to download the pdf's locally.

I've used mongoDB as the database for this program.

## How to install
> Git clone repo
```
git clone git@github.com:bynned/Upload-and-Share-PDF.git
```
> Create a .env file in the /formatpdfbackend directory with the following information:
```
DB_URL="YOUR DATABASE URL"
```
> Create a directory "uploads in the /formatpdfbackend directory
```
mkdir uploads
```

## important to note:

The purpose of MongoDB would be to store the metadata and references to the PDF files rather than the actual files themselves. 

### TLDR
The PDF's are stored in the /uploads folder
