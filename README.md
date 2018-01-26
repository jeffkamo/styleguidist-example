Running the following should work.

```
yarn install
npm run styleguide
```

And then visit [http://localhost:4000/](http://localhost:4000/)

Following these steps, you should find that the example component works with Styleguidist when rendering the pure functional component with implicit return:

```jsx
// No warnings received with this example
const Button = ({children}) => (
    <div>{children}</div>
)
```

...but will not work with Styleguidist when rendering the pure functional component with an explicit return:

```jsx
// Warning received in the command line:
//
//     Warning: Cannot parse src/components/button/index.jsx: RangeError:
//     Maximum call stack size exceeded
//
const Button = ({children}) => {
    return (
        <div>{children}</div>
    )
}
```

**Note**

Unfortunately, `npm install` does not seem to work well. Running the styleguide after installing with npm results in the `Maximum call stack size exceeded` error in both the examples mentioned above. I'm not sure why.
