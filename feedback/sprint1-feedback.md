# Feedback for YellowYabby

## Sprint 1

(X) Tagged commit
(X) closed user stories assigned to sprint
(X) working deployment on Heroku
(X) Travis passing
( ) personal evals completed
(X) demo

### Assessment

Checklist: ME/BE
User stories: ME/BE
Agility/scrum: ME/BE
Integration: ME
Implementation: ME
Functionality: BE

### Discussion

**Checklist**: Three of your team have not done the person evals: Will, Checko, and Farhan.

**User stories**: The user stories are on the vague side, and I note that you managed to work through a pretty small number of them (and two of them are the same). On the plus side, I appreciate that you linked files to them and list attendees. I would suggest listing out acceptance tests so you know when you have actually satisfied the stories. I'm not sure what 1.1 or 1.3 are actually about or how they were satisfied. You have a way for the host to enter information, but no follow up for how to see it? You have also closed "want to add music". This one is overly broad (no search, no mention of a queue), and also not clear that it _is_ satisfied. You have a page where you can manipulate songs, but no evidence that it is added to anything (I realize that is probably the missing page, which is an indication that your process needs some work). I suggest breaking things up further, not implementing things that aren't covered in stories and being clearer about what satisfies them.

**Agility/scrum**: As was discussed at your retrospective, you should adopt a pattern of more frequent updates to main. All of the activity on the main branch appears to come right at the very end of the sprint in a flurry of merging.

**Integration**: The PRs look okay -- I don't see failing merges or self-merges. There are relatively few of them, however. I see a couple of lingering feature branches, which you should contemplate deleting unless they are still active concerns (which wouldn't match all of your closed issues).

**Implementation**: The implementation is looking okay. I see some tests that look reasonable. Be careful about useless code like your bogus search.js page and all of the extra state variables in Home. You don't want to build up technical debt.

**Functionality**: You have clearly made forward progress and have a reasonable start on the project. I realize that part of your team was working on their tech spike, which will hopefully pay dividends in the next sprint. However, I was hoping you would be a little farther along at this point. At this point, you only have bits and pieces, and it feels like you don't have a real solid design.
