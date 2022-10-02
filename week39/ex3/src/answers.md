# Task 1

## b)

When you import a module, the code is loaded asynchronously. This means that the code is not executed immediately, but rather when the module is needed. This is why the code in the module is not executed when the module is imported. The code is executed when the module is used.

When you include directly a JavaScript file, it is done synchronously. This means that the code is executed immediately when the file is included.

You can also use the type module in the script tag to import a module. This is the same as importing a module.

# Task 5

## Promise and promise states

A Promise is an object that represents the eventual completion or failure of an asynchronous operation. A promise can be in one of three states:

- pending
- fulfilled
- rejected

When a promise is fulfilled, it means that the operation was completed successfully. When a promise is rejected, it means that the operation failed. While a promise is pending, it means that the operation is still in progress.

## Async and await

The async keyword is used to define an asynchronous function. An asynchronous function is a function that returns a Promise. The await keyword is used to wait for a Promise. The await keyword can only be used inside an async function.

## The _then_ function

The then function is used to handle the result of a Promise. The then function takes two functions as parameters. The first function is called when the Promise is fulfilled. The second function is called when the Promise is rejected.

Async and await are the new sugar syntax to handle Promises. The then function is the old way to handle Promises. You should use async and await instead of the then function if possible to make the code more readable.

# Task 7

## a)

I think Peter should not implement these gestures because they are generally used to zoom in/zoom out. So the users will not expect to control the volume by doing the described touch gestures.

## b)

It's not the best idea because we don't really know what the button means. If "On" is displayed, does that mean that it is turned on or that the user's click will turn it on? Same for "Off". It's better to use a toggle button.

## c)

As it is possible to skip login, it means that some parts of the application/website are available without being logged in. So I think it's better to choose option B to display meaningful content to the user.

## c-bis?)

I would use icon B because it's simple and flat-designed. C could also be a good option but we can make the blue background with CSS instead of hardcode it inside the icon. The B option let us more possibilities to customize the icon.

## d)

Negative space, also called white space is the area of the layout of the UI which is left empty. For example the room around some text or image. It allows the elements to breathe and to be more visible. It also helps to separate the elements and to make the UI more readable.

## e)

Onboarding is the process of introducing a new user to a product. It is a way to help the user to understand how the product works and how to use it. I think it's a really good idea to use onboarding if the app is complex and unavailable without being logged in.
