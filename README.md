# License

This engine is licensed under the Mozilla Public License 2.0. You can use it freely in commercial and non-commercial projects. Modifications to engine files must remain under the MPL.

## Development

The project uses [Vite](https://vitejs.dev/) with **React** and TypeScript. After installing dependencies run:

```bash
npm run dev
```

for a development server on port `5173`, or start the JSON editor with:

```bash
npm run dev:editor
```

This command serves the editor on port `5174`.

Build with:

```bash
npm run build
```

To build without including the editor, run:

```bash
npm run build:release
```

The build step copies the game data from the directory specified by the
`GAME_FOLDER` environment variable into `dist/data`. If this variable is not
set, the `sample-game` folder is used.

During development the same files are served via `vite-plugin-static-copy`,
allowing JSON resources from `resources/` or your game folder to be accessible
while running `npm run dev`.

## Game API Server

The editor communicates with a small Express server that reads and writes the
`index.json` file of your game. Start it together with the dev server using:

```bash
npm run dev
```

or run it separately with:

```bash
npm run dev:server
```

The server uses the `GAME_FOLDER` environment variable to determine where the
game data lives. If not set, it defaults to `sample-game`.

## Testing

Run the unit tests once with:

```bash
npm test
```

