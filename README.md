# Leses coding test

### Just some principles I always try to follow:
- I'd rather using React function based components instead of a React Class based components (with react hooks we can create a any project with only function components)
- React components should be as small/simple as possible.
- I try always creating pure function, this sometimes might lead to a verbose code but it's better for creating testable code.
- Whenever it's possible to shorten the code using language sintax sugar, I do it.

### a) Implement ability to search in messages list. 
In order to implement a search feature I refactored `MessageList` 
component in smaller components: 
 - MessageList
 - MessageListItem
 - ListHeading
 
Since the logic of `ListItemDetails` is not dependent of MessageList, I removed it from
that and put it on a parent component `Section`.

The `Section` component has two instances of `MessageList`: One is for displaying the data 
which is coming from the stream and another is for displaying the resulting data of a search action.

Besides the `MessageList` component a Section includes an `Action` component which is 
responsible to manage those lists, like subscribe to a stream, unsubscribe, clear message and search items.

### b) Change the application such that it unsubscribes automatically after 15000 messages received from the server.

The logic for that feature can be found at `Action` component.

```javascript
    if (totalOfMessages > 15000 * chunk) {
        subscriptions.map(subscription => {
            this.onUnsubscribe(subscription);
        });
    }
```

This chunk is counter for counting how many times the user tried to subscribed to a stream and then 
increasing the total of messages limit up to how many times the user actually want to receive a chunk of the data.


### c)  Add a secondary way to view the data, in a chart(free to choose from any lib). The user should be able to tab between the 2 views, the existing list and the chart. (use bulma's tabs to achieve this). The subscribe panel should be visible in any of the views.

You can find the logic for that feature at `Chart` and `MessageList` component. But since a chart
requires at least two axis and the data's structure coming from the stream change according to the subscribed query the user firstly must pick
which data properties it would like to be taken for building the Chat.

### d) Add some tests for either the existing logic or new logic that you add

There are unit tests for all components asserting that they can be successfully mounted without throwing an error.





