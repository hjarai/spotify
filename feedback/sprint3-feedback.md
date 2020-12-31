## Sprint 3

(X) Tagged commit
(X) closed user stories assigned to sprint
(-) working deployment on Heroku
(X) Travis passing
(X) personal evals completed
(X) demo

### Assessment

Checklist: ME
User stories: ME
Agility/scrum: ME
Integration: ME
Implementation: ME
Functionality: ME
Group writeup: ME
Demo: ME

### Discussion

**Checklist**:
Obviously I gave a pass to everyone on getting Heroku up and running. Otherwise, you hit all of the items on the list.

**User stories**:
Users stories look okay. They seem well managed and reasonably written. I would have liked to see some acceptance tests described so you knew when they were done. I appreciated the linking to the pull requests.

**Agility/scrum**:
Your process seems okay, though you clearly really had a big push at the end there.

I also note that you included the databases in the repository, which isn't a great practice.

**Integration**:
I see a lot of pull requests, and little evidence of self-merges (which is good).

**Implementation**:
The README has not been updated to include information about how to get your site up and running with authentication and Spotify. You are also missing information about how to set up your database (which should provide instructions for running migrate), and you left in the part I wrote about setting up Heroku that includes seeding the database (which you don't need).

I see some tests, but there are no integration tests. I also see a lot of warnings in the console when I run the tests. Overall, it seems like the testing here is fairly minimal.

It also looks like there was some misunderstandings about what a "page" is. I see two files (`Export.js` and `image.js`) that are in the `pages` directory that should not be. In truth, they are not even React components -- they should be stored in the `lib` directory since they are just lists of useful functions. the `image.js` file is particularly problematic as is contains server side functionality.

The confusion with pages continues to the other files (which _are_ pages). You do have some separation, but within `index.js` you are (in essence) creating several other pages. While this was the model we used in Simplepedia (though without the ugly multi-depth ternary operator -- seriously, use if-else or switch for multiple choice conditionals), you really should pick one and stick to it. I was also surprised not to see a dynamic route used -- your project seems to beg for a dynamic route for the different OneLists.

In general, the code otherwise looks reasonable (besides the ugly three level deep ternary expression in `index.js`).

**Functionality**:
For the most part, the site seems to work as promised. I can create playlists, add songs to them, and export them to Spotify. I did get one error (a "rendered more hooks" error) in `onelists.js` returning to home from it one time. That said, there are some choices that compromise the mechanics of your site (see below).

**Final Thoughts**
I think you should be proud of what you accomplished. I really appreciate that your site is trying to do something new, something that hasn't been tried yet. On top of that, the site is entirely usable right now.

However, as I intimated above, I also struggle with some aspects of the site. Some of the problems stem from design choices, others, I suspect come from not knowing how to make certain things work, and others may come from your originally disjointed group dynamics. The problem I have is (a) this is not a design course, and (b) it is not always obvious what was an ill-advised choice, and what was a fall-back. Here are some examples:

The login flow seems odd to me and a little confusing. There is a little 'Sign in' link just floating at the bottom of the page, which looks like an afterthought. Since there isn't an account creation (per se -- you are assuming they will have a Spotify account), I'm not sure why the create and view buttons don't pass you off to the login process if you aren't logged in first. It is very weird that you can fill in all of the information about an event without being logged in. I also think it is odd that the button to look at a specific Onelist is called "Join" which makes it sound like an account creation button).

I think you still haven't gotten the flow for adding songs quite right either. I'm not sure why I go to a different page for adding songs. The extra dialog box to confirm seems annoying, especially as there isn't an option there. It would be far better to just indicate that the song had been added. I also am missing the ability to see more (i.e., page through the results). When you search for an artists, you get 10 tracks... and that is it.

Also, it seems problematic that the list of the user's OneLists is just that, a list. There is no link to actually return to the list. As such, the owner has to visit lists as a common user after leaving it for the first time. This removes all power the owner has -- they can't even remove tracks they added earlier.

I was also fascinated to realize that in the effort to simplify the process for non-owners, you actually made it really easy to sabotage the lists. A user can add a track and then "join" the list multiple times to upvote the song as high as they like.

There are a couple of other UI issues mixed in there as well.

I don't want all of that to dishearten you. Overall, I think your group did a fine job of pulling this together. You have some complex functionality, and I think you learned a lot about writing complex web applications and interacting with API servers. I also believe that you all learned something about working on a team. It looks like you successfully course corrected by the end of the project from your original divisions. I _also_ think your project has some issues to address before I would release it to the wild (beyond whatever database issues you are having with heroku, which I didn't spend time looking into). My suspicion is that if you had a little more time or had solutions to some issues earlier, you would have corrected some of these issues.
