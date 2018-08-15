/* feedreader.js
 *
 * Contains all of the tests that will be run against application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         * Answer: Error. Expected 0 not to be 0.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        allFeeds.forEach(function(item){
            it('has defined URL that is not empty',function(){
                expect(item.url).toBeDefined();
                expect(item.url).not.toBe("");
            });
        });
        


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        allFeeds.forEach(function(item){
            it('has defined URL that is not empty',function(){
                expect(item.name).toBeDefined();
                expect(item.name).not.toBe("");
            });
        });

    });


    /* This test suite is about the menu.*/

    describe('The menu', function(){

        /* This test ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it('should be hidden by default',function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* This test ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        
        it('change visibility when clicked',function(){
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });


    });


    /* This test suite is for initial entries. */


    describe('Initial Entries', function(){

        /* Since loadFeed() is asynchronous, this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        it('.feed should have at least one .entry element',function(){
           expect($(".feed .entry").length).toBeGreaterThan(0);
        });

    });



    /* Test suite for new feed selection */



    describe('New Feed Selection',function(){
    
        var initialFeed;
        
        beforeEach(function(done) {
            loadFeed(0);
            initialFeed = $('.feed').html();
            loadFeed(1,done);
        });

        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        it('.feed content should update when new feed loaded', function(){
            expect($('.feed').html).not.toBe(initialFeed);
        });

    });



    
}());
