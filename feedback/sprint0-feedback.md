# Feedback for YellowYabby

## Sprint 0

(X) project repository with all team members
(X) package.json updated
(X) `npm test` and `npm run lint` run without errors
(X) travis reports build passing
(X) project deployed to heroku
(X) README.md is updated
(X) one pull request
(X) commit tagged sprint0
(X) backlog populated with epic user stories
(X) lo-fi storyboards created
(X) CRC cards created
( ) individual submission of screenshots

### Assessment

Checklist: ME
Project setup: ME
User stories: ME
CRC cards: ME
Storyboards: BE

### Discussion

You should update how you display the Travis badge. You want to display it as an image, not a web link.

Three of you did not submit screenshots (Will, Cheko, Farhan)

The user stories look okay. I wonder a little bit about "As an attendee, I want to be able to sign in with a name, So that other people can see my songs additions." Does that mean that you want others to see that you contributed the song? Why? Go deeper? Are there other reasons why you want to be able to sign in? Maybe the host wants to be able to invite individuals to keep spammers out?

Another one that caught my eye is "As an attendee,I want to search valid Spotify songs to add to the playlist, So that attendees can vote on unambiguous songs". Is an attendee really concerned about unambiguous voting? Isn't a more important reason because the attendee wants to add a song that could actually be played?

There is also a fairly big problem hiding in this one: "As an attendee, I want to be able to export the current playlist into my Spotify account at any time, So that I can permanently save and listen to the playlist." Have you figure out a reasonable path for doing that?

The storyboard is a bit minimal. These are still the versions you had on the board. That is okay, but perhaps contradictory? I was hoping you would iterate a little on these and come up with a real design.

The CRC cards seem fine. I suspect that your `Playlist` need to know the `Event` it is associated with (or vice versa). Can an event have more than one playlist? Can a playlist belong to more than one event?

The `ExportButton` should not have a CRC card. It should be a button. CRC cards don't have to cover all functionality -- they are about data or "things" (like views) that have information they need or functionality. There will be a function somewhere that figures out how to export the list. That isn't really associated with any particular "thing" in the system.
