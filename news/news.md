[[Just to demonstrate the separation between posts.]]
Also, that text above is what a title will look like without a header image.
-=-=-
[[Hello, Dale!]]
[{https://minecraft.net/static/pages/img/index-hero.e528a3b1fd01.png}]
This is the news panel. It takes up half of the website.

It is easy to use (I hope). The majority of the news syntax is just [Markdown](http://commonmark.org/help/), with a couple of extra things.

There are three extra syntactical differences:
1. By surrounding the title with double square brackets, you will have an official title at the top of the post. The title is required for every article.
2. By surrounding a path to a header image with one pair of [ and one pair of {, you will get a specially-formatted header image.
3. Separate your posts with -,=,-,=,- (without the commas).

Everything goes in the `news.md` file in the news directory. Also, the file is reversed, so by putting the newest post at the bottom of the file, it will appear at the top of the posts.

In-line images look like this:

![Minecraft Hero Image](https://minecraft.net/static/pages/img/index-hero.e528a3b1fd01.png)