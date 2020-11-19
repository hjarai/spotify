## Sprint 2

(X) Tagged commit
(X) closed user stories assigned to sprint
(X) working deployment on Heroku
(X) Travis passing
( ) personal evals completed
(X) demo

### Assessment

Checklist: ME
User stories: ME/BE
Agility/scrum: ME
Integration: ME/BE
Implementation: ME
Functionality: ME

### Discussion

**Checklist**:
Mostly done. Missing evals from David, Will, and Farhan.

**User stories**:
I think your user stories could still use a little bit of work. The stories themselves seem to be getting better, and I'm glad to see that you added in acceptance tests. However, it is not clear that they are really driving the development the way that they should be.

For example, 2.7 "As a host, I want to choose from a list of playlist images so that I can convey the theme of the OneList to my attendees". This appears to be implemented as a place to upload an image, which is not the same thing. It isn't a bad thing, it just isn't what this story claimed... and it is closed.

Or 2.3, which says "As an attendee, I want to be able to sign in with a username and event ID, So that other people can see my songs additions and other people can't vote more than once per song." This is also closed, and it is fairly obvious that this is not what is in your implementation. Other stories have similar issues. The acceptance tests don't quite line up with the story and the implementation doesn't quite line up with the acceptance tests.

**Agility/scrum**: This looks okay. It looks like you got the sprint off to a slow start, but I see fairly regular activity after that.

**Integration**: Clearly this process went very wrong at the last minute for your group. I see a good pattern of pull requests and other eyes on them. Perhaps you have gotten in the habit of accepting the work of others and not actually reviewing it first?

**Implementation**: I see some cruft in here: imported packages that are not used, a page that isn't active (search.js), a database file that was checked into the repository. I also see some comments disabling eslint complaining to you about some of those... This kind of defeats the purpose of using a linter. Please only use the disable codes for moments where it is clearly interfering with the implementation (like assignment 1 where we had to use console.log).

On the other hand, I see a good number of tests. So, on balance, you are doing fine, but please remove the disable codes before the end of the next sprint.

**Functionality**: You are making reasonable progress. As I said in class, I am a little concerned that your team has been split for so long. Integrating will need to be an early goal for the sprint.

It looks like you still have some design work to do. The login button should not just float through every page. I think you also need to think a little more about your flow.

- A random visitor visits your page. What do they do? Probably leave because there is nothing to explain what this site is
- A user with several play lists stops by. How does she get to her lists?
- An attendee stops by. Do they start with a link? A unique number? Why would they click 'Join now' -- that sounds like they are signing up.

Some styling would also not go amiss...
