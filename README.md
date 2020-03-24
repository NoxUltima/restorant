# Welcome

RestoRant is a portable website where users 'rant' and 'rave' about their experiences and opinions about the restaurants they have visited. I developed this website as part of my polytechnic's coding project which I began working on in December last year.

This website was planned, designed and programmed all by hand from scratch, using nothing but the tools and research which I have gathered from online or my school resources. I am not going to propose or release this project, but feel free to download and explore this website.

## Getting started

There're a few things you need to do in order to setup your project. This is exactly how I did it when I was in poly.

### Software and Database

1. Get XAMPP, VS Code and MySQL installed. Pin these applications to your taskbar for easier access.
2. Open XAMPP Control and on the row that says MySQL, click "Start" to turn on MySQL.
3. Open and execute the two SQL files - restorant (main) and UpdateStats.sql.

### Setting up the website

You do not need to do steps 1-5 again.

1. If you may want, you can download Postman, which is a REST client.
2. To start the website, move the entire directory to a location which you may like.
3. Navigate one step back and right click until you see "Open in Code".
4. On this directory, unarchive the two zip files `node-modules` and `images` at the parent directory. Make sure to select "Extract Here" if you have 7Zip, or delete the new directory that comes default in your default Windows unarchiving tool.
5. Leave the node-modules folder where it is. Move the image folder to the `/public` directory and place the folder there.

6. When you are done, go back to/open VS Code, open the Terminal and type in the command `node server.js` to start the website.
7. Look out for the link `http://127.0.0.1:8080` (port numbers may change) and go to the browser of your choice. Happy exploring!

## Screenshots

### Home Page

![Nav and Carousel](screenshots/nav.png)

![Index](screenshots/index.png)

![Recommended](screenshots/recommended.png)

![Disclaimer & Footer](screenshots/disclaimer.png)

### Search & Restaurant Pages

![Search](screenshots/search.png)

![Restaurant Page](screenshots/restaurant.png)

![Gallery and Rating Stats](screenshots/gallery.png)

![Video and Reviews](screenshots/video.png)

### Timeline & Account Pages

![Timeline](screenshots/timeline.png)

![Edit Info](screenshots/edit.png)

![Sign Up](screenshots/signup.png)

![Log In](screenshots/login.png)

![Forgot Password](screenshots/forgot.png)

![Reset Password](screenshots/reset.png)

### About Page

![About](screenshots/about.png)

![Walkthrough](screenshots/walkthrough.png)
