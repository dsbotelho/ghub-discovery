<a name="readme-top"></a>
<br />

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#ui-overview">UI overview</a></li>
        <li><a href="#implementation-overview">Implementation overview</a></li>
        <li><a href="#services-overview">Services overview</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#running-unit-tests">Unit tests</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#final-considerations">Final considerations</a></li>
    <li><a href="#known-issues">Known issues</a></li>
  </ol>
</details>

# GithubDiscovery

Github Discovery is an angular application created to browse and find the top repositories for a given language.

## About the project

The concept of this project is focused on finding the best and most popular repositories for a given language!

The user can have its own list of favorite repositories.

By default, there's only a few frontend focused languages that can be browsed. This list is hardcoded in the `topicsInitialState` array. `Typescript` is selected by default.

Final note: Commits were not squashed in order to have access to the evolution of the implementation.

### UI Overview

As for the UI, the goal was to have a "netflix-like" UI, even if it's far from it at the moment :joy_cat:. Additional considerations regarding UI decisions:

- Each repository list is a flex container which will only grow horizontally.
- `DiscoveryContainer` component houses all the components in the `Discovery` page.
- If the user scrolls to the end of each list, more repositories can be loaded by clicking on the "+" button.
  - This is not ideal for big lists. A new approach will be implemented in future improvements (load data after reaching the end of the scroll ?)
- The user can toggle which topics should be displayed.
  - Selecting a new topic will trigger a new API request, and a loader will be displayed for each component. This prevents additionals actions until the request is completed
- Regarding Sorting:
  - When sorting by any of the properties, an icon will be displayed.
  - This icon indicates the current sort order:
    - angle-down icon -> sorting by descending order
    - angle-up icon -> sorting by ascending order

### Implementation overview

- The code structure is divided by features. Each feature can then have its own folder structure, based on its needs
  - This structure can be improved.
- A repository container is responsible for rendering information regarding one language.
- A directive is "attached" to each `repo-container` component
  - This directive is responsible for handling all the logic related to this component:
    - Load data from the API
    - Initialize the component's input
    - Handling logic related with bookmarks
  - By using this approach, the component itself does not have any logic and everything is delegated to the directive.
- Each repository card renders the `repo-item` component template.
  - Dumb component that will only display information.
- The `http-params-builder` model contains logic related with API requests.
  - The goal here was to have a solution that could be used across the entire application.
  - By having different methods, I can control if I want a paginated request, a sortable request or both at the same time
  - The `build()` method will return a `HttpParams` object which can then be passed as parameter in a API request.
  - By default, 10 items will be requested in each API request. At the moment, this value cannot be customized/changed.
- Regarding sorting
  - Sorting by any of the properties available will reset the current request data to the default configuration and will also reset the current data for each repository.
  - This may not be the best solution, but it was implemented to prevent unwanted behaviour. Will improve on this in the future.

### Services overview

The application uses different services to store and provide important information. All services are being provided at root level at the moment.

- **GithubHttpService**
  - API service responsible to fetch data from the github api.
  - Uses `http-params-builder` model to build the neccessary request params
  - At the moment, filtering by stars is hardcoded. Request will always query by repositories with more than 1000 stars.
    - This is not ideal and will be refactored ASAP.
  - Uses an handler to map the API response.
- **TopicSelectorService**
  - Responsible to handle logic related with the selected topics
  - Uses signals to state manage the topics.
  - The topics signal is exposed `asReadonly`. By doing this, we're making sure no part of the application can make unwanted changes to our information
- **BookmarkService**
  - Responsible to handle logic related with bookmarks
  - Uses signals to state manage the bookmarks.
  - Simlar to the topic service, the bookmarks signal is exposed `asReadonly`.
  - Uses an external lib to store and retrieve information from the browser sessionStorage
- **LoaderService**
  - Uses signals to store information about an `isLoading` boolean.
  - This signal is updated by an http-interceptor everytime a http request is made.
    - `isLoading` is set to true during the request, and set back to false when the request ends.
  - The value of the signal is subscribed by multiple components in order to display a loader spinner when a request is happening.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

If everything is correct, this project should run locally without needing external libraries.

### Prerequisites

Node.js and npm installed.

### Installation

1. Clone the repo
   ```
   git clone https://github.com/dsbotelho/ghub-discovery.git
   ```
2. Install NPM packages
   ```sh
   npm i
   ```
3. Run the application
   ```
   npm start
   ```
4. Run it on the browser. By default, it will be on port 4200
   ```
   http://localhost:4200/discovery
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Running unit tests

Since angular is moving away from karma and making jest the default engine for unit testing, I decided to implement my tests with jest.

Run `npm run test` to execute the unit tests via [Jest](https://github.com/thymikee/jest-preset-angular).
Alternatively, if you're using VSCode, you can use an extension to run the tests using a dedicated UI. Extension `Jest` is the one I'm currently using.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

- [ ] Add authentication using firebase
- [ ] Allow pagination customization
- [ ] Allow filter customization (filter by number of stars, forks, etc.)
- [x] Allow sorting for each repository
- [ ] Add grab behavior for each repository list

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Final Considerations

Unfortunately, I do realize UI improvements can be made. I didn't have the time/opportunity to make it as beautiful as I wanted, but I'll definitively work on it as soon as possible :smiley_cat:

## Known issues

- Bigger repository names may overflow in the header/cause UI issues.

Feel free to offer suggestions or to code review. Feedback is always welcome.

<div align="center"><img src="https://i.imgflip.com/8ar7ce.jpg" title="made at imgflip.com"/></div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
