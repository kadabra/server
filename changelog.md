# Changelog

## [0.9.0] - 2018-11-20 - The .kadabra Folder Update
- Kadabra now operates inside of a `.kadabra` folder
  - Run `kadabra --here` or `kadabra -H` to create or use a `.kadabra` folder in your current directory
  - This means you can run Kadabra in your Dropbox/GDrive :rollsafe:

#### Other Updates
- New splash page with `chalk`, `figlet`, and `clear`
- Open page with `opn`
  - Run `kadabra --noopen` or `kadabra -N` to suppress
- Refactored to use `shelljs` instead of `spawn`
- Refactored to use env variables

### [0.8.2] - 2018-11-10
- Fixed @kadabra/nodemon stack-tracing on post-install

### [0.8.1] - 2018-11-10
- Reduced console logging

## [0.8.0] - 2018-11-10 - The Admin Update
1111
#### Admin
- Debut of admin
- Features:
  - Connect to multiple servers
  - Create, edit, and delete endpoints
  - Read from created endpoint collections
- To Do:
  - Create, edit, and delete records in endpoint collections

#### Added
- Added patch service method to EndpointManager
- Created custom mutation in store for splicing - will work into `simple-vuex`
- 

#### Changed
- Simplified `Page.vue`
- Mangled css for background color tinting to accout for vuetify styles

### [0.7.0] - 2018-11-10
- Testing out admin panel

## [0.6.0] - 2018-11-09
#### Added
- Console logging on endpoint creation and deletion
- Verbose, human-reabable error handling for endpoint creation and deletion
- Init changelog

#### Changed
- Endpoints now have object vals instead of descriptions
