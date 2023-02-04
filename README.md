# project-one
1. Clicking discover button calls OMDB function. DONE
2. OMDB function returns object, info from which should be displayed on the page (title, year, plot, poster) in generated div. DONE
3. Discover also calls youtube function. DONE
4. This function returns youtube object- including videoID DONE
5. Video ID from this function is stored in a variable that is inserted into iFrame video embed DONE
(lets start off with this a MVP)
6. Make all this information appear presentable on the page
7. Add a "to watchlist" button in div to get information saved to local storage, and to add to a separate watchlist 
8. Add a "seen" button that adds the film to a "seen" list (again saving to local storage)
(if I can do this before and during class, I'm happy)

I want to use the API to retrieve the trailers and display them in a visually appealing way, such as in a grid or a carousel.

# Separate API Keys per user in your project.
1. Create a file at the root of your repository called .gitignore
2. Add the following line to the file
  keys.js
3. Add, commit, and push your .gitignore file to the repository.
4. Have everyone pull from the repository.
5. Everyone should confirm they have the .gitignore file locally.
6. Add a file in your project called keys.js
* Because this file is in your .gitignore, git will not track it.
7. In keys.js, define a global variable or set of variables in this file:

        var omdbApiKey=3k45j4k623j6k14;
        var openWeatherApiKey=9E92A9EV239V29V82V2;

8. Use those variables in your project.

        <script src="keys.js"></script>
        <script src="project.js"></script>

9. When you deploy to github pages, you will need to change the above so that it uses a file that exists. You can add a file called `public-keys.js` to your repository, and put keys in there. Then, change keys.js to  public-keys.js (for example:)

        <script src="public-keys.js"></script>
        <script src="project.js"></script>


1. Clicking discover button calls OMDB function. DONE

2. OMDB function returns object, info from which should be displayed on the page (title, year, plot, poster) in generated div. DONE

3. Discover also calls youtube function. DONE

4. This function returns youtube object- including videoID DONE

5. Video ID from this function is stored in a variable that is inserted into iFrame video embed DONE
(lets start off with this a MVP). I want to use the API to retrieve the trailers and display them in a visually appealing way, such as in a grid or a carousel.

6. Make all this information appear presentable on the page. NOT YET. Delegate.

7. Applies object keys as classes to generated p elements to apply styles in CSS. DONE 

8. Add a "to watchlist" button in div to get information saved to local storage, and to add to a separate watchlist. DONE

9. Add a "seen" button that adds the film to a "seen" list (again saving to local storage). DONE

10. Make it so that multiple films can be displayed when clicking search button- prepended to previous film. DONE

11. Create a "get a suggestion" button that will give the user a random film they can either add or move on from.

12. Create a rotten tomatoes section that shows whether the film is fresh or rotten.

13. Create a clear list function so that when movies are added to either list there are no repeat values. DONE

14. CSS styles on watch and seen list
