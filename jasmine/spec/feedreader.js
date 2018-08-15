/* feedreader.js
 *
 * Contains all of the tests that will be run against application.
 */

/* Tests are placed within the $() function, since some require
 * DOM elements. 
 */

$(function() {

    /* RSS FEED TEST SUITE*/

    describe('RSS Feeds', function() {

        /* This tests to ensure the allFeeds variable has been defined
         * and is not empty. 
         */

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed
         * in the allFeeds object and first ensures it has a URL defined
         * and that the URL is not empty, then ensures it has a name defined
         * and that the name is not empty.
         */

        allFeeds.forEach(function(item,index){
            it('feed ' + index + ' has defined URL that is not empty',function(){
                expect(item.url).toBeDefined();
                expect(item.url).not.toBe("");
            });

            it('feed ' + index +' has defined name that is not empty',function(){
                expect(item.name).toBeDefined();
                expect(item.name).not.toBe("");
            });

        });

    });

    /* MENU DISPLAY TEST SUITE*/

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
        
        it('should change visibility when menu icon clicked',function(){
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });


    /*INITIAL ENTRIES TEST SUITE*/

    describe('Initial Entries', function(){

        /* Since loadFeed() is asynchronous, this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        /*SOURCE: I referenced a Udacity Forum post in order to help me determine the
        proper use of the done callback: https://knowledge.udacity.com/questions/1649*/
        
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



    /* NEW FEED LOAD TEST SUITE*/

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
            expect($('.feed').html().not.toBe(initialFeed);
        });

    });

}());
