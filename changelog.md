# Changelog

## [0.8.0] - 2018-11-10 - The Admin Update

### Admin
- Debut of admin
- Features:
  - Connect to multiple servers
  - Create, edit, and delete endpoints
  - Read from created endpoint collections
- To Do:
  - Create, edit, and delete records in endpoint collections

### Added
- Added patch service method to EndpointManager
- Created custom mutation in store for splicing - will work into `simple-vuex`
- 

### Changed
- Simplified `Page.vue`
- Mangled css for background color tinting to accout for vuetify styles

## [0.7.0] - 2018-11-10
- Testing out admin panel

## [0.6.0] - 2018-11-09
### Added
- Console logging on endpoint creation and deletion
- Verbose, human-reabable error handling for endpoint creation and deletion
- Init changelog

### Changed
- Endpoints now have object vals instead of descriptions
