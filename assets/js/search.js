
var documents = [{
    "id": 0,
    "url": "https://dgunning.github.io/404.html",
    "title": "",
    "body": " 404 Page not found :(  The requested page could not be found. "
    }, {
    "id": 1,
    "url": "https://dgunning.github.io/about/",
    "title": "About Me",
    "body": "This is where you put the contents of your About page. Like all your pages, it’s in Markdown format. This website is powered by fastpages 1.       a blogging platform that natively supports Jupyter notebooks in addition to other formats.  &#8617;    "
    }, {
    "id": 2,
    "url": "https://dgunning.github.io/categories/",
    "title": "Tags",
    "body": "Contents: {% if site. categories. size &gt; 0 %} {% for category in site. categories %} {% capture category_name %}{{ category | first }}{% endcapture %} {{ category_name }}{% endfor %}{% endif %} {% for category in site. categories %}  {% capture category_name %}{{ category | first }}{% endcapture %} &lt;h3 id = {{ category_name }} &gt;&lt;i class= fas fa-tags category-tags-icon &gt;&lt;/i&gt;&lt;/i&gt; {{ category_name }}&lt;/h3&gt;&lt;a name= {{ category_name | slugize }} &gt;&lt;/a&gt;{% for post in site. categories[category_name] %}{%- assign date_format = site. minima. date_format | default:  %b %-d, %Y  -%}&lt;article class= archive-item &gt; &lt;p class= post-meta post-meta-title &gt;&lt;a class= page-meta  href= {{ site. baseurl }}{{ post. url }} &gt;{{post. title}}&lt;/a&gt; • {{ post. date | date: date_format }}&lt;/p&gt;&lt;/article&gt;{% endfor %} {% endfor %}"
    }, {
    "id": 3,
    "url": "https://dgunning.github.io/images/copied_from_nb/",
    "title": "",
    "body": "WarningDo not manually save images into this folder. This is used by GitHub Actions to automatically copy images.  Any images you save into this folder could be deleted at build time. "
    }, {
    "id": 4,
    "url": "https://dgunning.github.io/charts/visualization/data/2020/03/12/artic-sea-ice-extent.html",
    "title": "Artic Sea Ice Extent",
    "body": "2020/03/12 -            The chart above is from the book Data At Work by Jorge Camoes. In this article we try to recreate the chart from Chapter 13 - Profiling, that displays the extent of Artic and Antartic sea ice from 1978-2015. We will use the Altair charting library.       import pandas as pdimport numpy as npfrom pathlib import Pathimport ipywidgets as widgetsimport calendarimport altair as alt    Sea Ice Data Files :       root=Path(&#39;. . /data/seaice&#39;)month_files = [str(f) for f in root. glob(&#39;*. csv&#39;)]    A function to load data for each month :       def load_month(index):  month_file = month_files[index]  df = pd. read_csv(month_file, dtype={&#39;year&#39;: str})  df. columns = [col. strip() for col in df. columns]  df = df. replace(-9999. 0, np. nan). replace(&#39;-9999&#39;, np. nan)  df = df. fillna(method=&#39;ffill&#39;)  return dfmonthly_ice = {i : load_month(i) for i in range(len(month_files))}    Create the Sea Ice Extent Chart :       height=140width=100def ice_chart(month, col=&#39;extent&#39;):  return alt. Chart(monthly_ice[month]). mark_line(). encode(    x=alt. X(&#39;year:T&#39;,         axis=alt. Axis(title=&#39;&#39;)),    y=alt. Y(f&#39;{col}:Q&#39;,         scale=alt. Scale(domain=(3, 18)),        axis=alt. Axis(title=&#39;&#39;))  ). properties( height=height,         width=width,         title=f&#39;{calendar. month_name[month +1]}&#39;    )def ice_charts(col=&#39;extent&#39;):  first_half = ice_chart(0, col) | ice_chart(1, col) | ice_chart(2, col) \        | ice_chart(3, col) | ice_chart(4, col) | ice_chart(5, col)  second_half = ice_chart(6, col) | ice_chart(7, col) | ice_chart(8, col) \        | ice_chart(9, col) | ice_chart(10, col) | ice_chart(11, col)  return alt. vconcat(first_half,         second_half        ). properties(         title=f&#39;Monthly Sea Ice {col. title()} 1978-2020 million km\u00B2&#39;      )    Monthly Artic Sea Ice Extent : After creating the ice_charts function we can now use it to display the charts.       ice_charts()    Monthly Sea Ice Area :       ice_charts(&#39;area&#39;)    "
    }, {
    "id": 5,
    "url": "https://dgunning.github.io/machinelearning/2020/03/09/creating-a-test-dataset.html",
    "title": "Creating a Dataset for Classification",
    "body": "2020/03/09 -            Machine learning algorithms are fairly easy to use if you have data that matches exactly what the algorithms are designed for. To get going with an ML project with generic data, you could generate the data in the exact shape for your ML project. For example, if you want to do classification, then you will need a target columns with the predicted classes, and you will need a dataset with the features that could predict these classes. If your machine learning project is in Python, then the best way to start is with scikit-learn. This easy to use yet powerful library also has convenience functions to generate test data, one of which is called make_classification. make_classification : Scikit-learn has a utility function to generate test data for classification called make_classification. With it you can generate a numpy array with features along with another array with predicted classes. This function is in the datasets package so to use it you would do from sklearn. datasets import make_classification data, target = make_classification(. . . ) and you will get the data and the target with some relationship between the two sufficient to do some machine learning. Here is an example First, set the random state       random_state=2          from sklearn. datasets import make_classificationdata, target = make_classification(n_features=12, n_samples=100, random_state=random_state)    The data array is a numpy array of shape (n_samples, n_features)       data[:2], data. shape  (array([[ 0. 65755125, -0. 73564052, -0. 25712497, 2. 16246241, -0. 46323032,     0. 50442818, -0. 1369783 , -2. 42825346, -0. 49282081, -0. 64920516,     0. 27511225, -0. 45730883],    [ 0. 54894656, -0. 07663956, -0. 08224538, -0. 15972413, 1. 70937948,     -1. 82138864, -0. 30466658, -2. 02559359, 1. 93662278, -1. 31756727,     -1. 25432739, -1. 71406741]]), (100, 12))  The target is a numpy array of shape (n_samples). The values will be 0 or 1 because by default n_classes is 2       target, target. shape  (array([0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1,    0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1,    0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0,    0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0,    1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0]), (100,))  Training a RandomForestClassifier : Now that we have the data, we can train a classifier and use it to predict a label.       from sklearn. ensemble import RandomForestClassifierclf = RandomForestClassifier(max_depth=2, random_state=0)clf. fit(data, target)  RandomForestClassifier(bootstrap=True, ccp_alpha=0. 0, class_weight=None,            criterion=&#39;gini&#39;, max_depth=2, max_features=&#39;auto&#39;,            max_leaf_nodes=None, max_samples=None,            min_impurity_decrease=0. 0, min_impurity_split=None,            min_samples_leaf=1, min_samples_split=2,            min_weight_fraction_leaf=0. 0, n_estimators=100,            n_jobs=None, oob_score=False, random_state=0, verbose=0,            warm_start=False)  Predicting an output label : After training we predict by passing in a data array. For simplicity we just choose one of the data values and we get a predicted label. This is not groundbreaking machine learning, but it shows how to quickly get a dataset that you can use to try different machine learning algorithms.       clf. predict([data[90]])  array([1])  Create a classification dataframe : The downside of the make_classification function is that it create numpy arrays without meaningful feature names. The bigger problem is that the features have different aspects - some are informative, others are redundant, or simply plain noise, without any indicator of which is which. To improve on it you can create dataframes, which allow for meaningful names that help in analysis and explainability.       from sklearn. datasets import make_classificationimport pandas as pdfrom datetime import datetimedef make_dataset(n_samples=1000, n_features=10, n_informative=6, n_redundant=2,         n_classes=2, weights=None, random_state=2):  data, target = make_classification(n_features=n_features,                   n_informative=n_informative,                   n_redundant=n_redundant,                   n_samples=n_samples,                   n_classes=n_classes,                   weights=weights,                   random_state=random_state,                   shuffle=False)  index = pd. date_range(periods=n_samples, freq=pd. tseries. offsets. BDay(),              end=datetime. today()). normalize()  columns = [f&#39;Info{i}&#39; for i in range(n_informative)] + \       [f&#39;Redun{i}&#39; for i in range(n_redundant)] + \       [f&#39;Noise{i}&#39; for i in range(n_features - (n_informative + n_redundant))]  df = pd. DataFrame(data, columns=columns, index=index). round(3)  target = pd. Series(target, index=index)  return df, target  data, target = make_dataset(1000, n_features=8, n_informative=4,               n_classes=3, random_state=random_state)    The features : The generated dataframe contains 8 columns. Informative features These are informative features, meaning features that have a predictive relationship with the targetRedundant features These features are generated as linear random combinations of the informative featuresNoise These are just noise, and should have no predictive power      data           Info0   Info1   Info2   Info3   Redun0   Redun1   Noise0   Noise1         2016-05-11   1. 744   1. 871   -1. 446   -1. 364   1. 321   0. 481   1. 188   1. 070       2016-05-12   0. 632   0. 028   -0. 756   -1. 235   -0. 475   1. 227   0. 005   -0. 076       2016-05-13   0. 879   0. 957   -1. 149   -0. 020   0. 880   0. 246   0. 282   0. 761       2016-05-16   1. 673   0. 602   -1. 594   -1. 734   0. 159   1. 664   2. 256   0. 028       2016-05-17   0. 385   0. 067   -1. 948   0. 851   0. 025   1. 189   1. 010   0. 528       . . .    . . .    . . .    . . .    . . .    . . .    . . .    . . .    . . .        2020-03-04   -2. 862   -0. 170   0. 767   -1. 832   -3. 387   1. 120   -2. 979   0. 188       2020-03-05   -3. 282   -1. 113   0. 751   -0. 832   -3. 789   1. 281   -1. 391   0. 114       2020-03-06   -2. 720   -1. 133   0. 383   0. 557   -2. 653   0. 716   1. 561   -0. 633       2020-03-09   -0. 499   0. 354   0. 266   0. 690   0. 304   -0. 744   1. 183   -1. 057       2020-03-10   2. 431   0. 276   0. 548   2. 319   3. 936   -2. 577   0. 539   1. 430   1000 rows × 8 columns   The target : The target variable contains the values 0,1,2 - three classes since we specified three classes in the make_dataset function call. These are roughly evenly distributed, though wecould have specified a different distribution of values.       pd. DataFrame(target, columns=[&#39;Target&#39;]). Target. value_counts(). to_frame(). sort_index()           Target         0   334       1   333       2   333     Redundant Variables : If we plot the redundant variables we can see that it is a linear relationship to the informative variables. They can be safely dropped from the input features to a machine learning model, or otherwise handled in a special way. Of course, with real empirical data, you would not necessarily know that beforehand but would learn it during data exploration.       import altair as altalt. Chart(data). mark_circle(). encode(  x=&#39;Info0&#39;,  y=&#39;Redun1&#39;). properties(  title=&#39;Informative vs Redundant Variables&#39;)    Informative Variables : The relationship between the informative variables and the target variables are a trickier to display on a chart because the target variable is categorical but if we plot we can see a relationship between these variables and the target. To make it easier to see the relationship we bin the informative variables and set the size of the marker to the count in each bin.       df = data. copy()df[&#39;Target&#39;] = target    Plot Informative Variables vs Target :       alt. Chart(df). mark_circle(). encode(  alt. X(&#39;Info0&#39;, bin=True),  alt. Y(&#39;Target&#39;, bin=True),  size=&#39;count()&#39;). properties(  title=&#39;Info1 vs Target&#39;)    Noise : Noise seems, well random       alt. Chart(df). mark_circle(). encode(  alt. X(&#39;Noise0&#39;, bin=True),  alt. Y(&#39;Target&#39;, bin=True),  size=&#39;count()&#39;). properties(  title=&#39;Noise vs Target&#39;)    Feature Importance : To see the importance of each feature, we train a RandomForestClassifier and then view or plot the feature importance.       clf = RandomForestClassifier(min_samples_split=4)clf. fit(data, target)feature_importance = pd. DataFrame({&#39;importance&#39;: clf. feature_importances_,                  &#39;feature&#39;: data. columns}). round(2)alt. Chart(feature_importance). mark_bar(). encode(  y=&#39;feature&#39;,   x=&#39;importance:Q&#39;). properties(  title=&#39;Feature Importance&#39;,  height=240)    As expected, the noise variables have the least importance. "
    }, {
    "id": 6,
    "url": "https://dgunning.github.io/jupyter/2020/02/20/test.html",
    "title": "Fastpages Notebook Blog Post",
    "body": "2020/02/20 -           About This notebook is a demonstration of some of capabilities of fastpages with notebooks. With fastpages you can save your jupyter notebooks into the _notebooks folder at the root of your repository, and they will be automatically be converted to Jekyll compliant blog posts! Front Matter : Front Matter is a markdown cell at the beginning of your notebook that allows you to inject metadata into your notebook. For example: Setting toc: true will automatically generate a table of contentsSetting badges: true will automatically include GitHub and Google Colab links to your notebook. Setting comments: true will enable commenting on your blog post, powered by utterances. More details and options for front matter can be viewed on the front matter section of the README. Markdown Shortcuts : A #hide comment at the top of any code cell will hide both the input and output of that cell in your blog post. A #hide_input comment at the top of any code cell will only hide the input of that cell.     The comment #hide_input was used to hide the code that produced this.   put a #collapse-hide flag at the top of any cell if you want to hide that cell by default, but give the reader the option to show it:              #collapse-hideimport pandas as pdimport altair as alt       put a #collapse-show flag at the top of any cell if you want to show that cell by default, but give the reader the option to hide it:              #collapse-showcars = &#39;https://vega. github. io/vega-datasets/data/cars. json&#39;movies = &#39;https://vega. github. io/vega-datasets/data/movies. json&#39;sp500 = &#39;https://vega. github. io/vega-datasets/data/sp500. csv&#39;stocks = &#39;https://vega. github. io/vega-datasets/data/stocks. csv&#39;flights = &#39;https://vega. github. io/vega-datasets/data/flights-5k. json&#39;       Interactive Charts With Altair : Charts made with Altair remain interactive.  Example charts taken from this repo, specifically this notebook. Example 1: DropDown :       # single-value selection over [Major_Genre, MPAA_Rating] pairs# use specific hard-wired values as the initial selected valuesselection = alt. selection_single(  name=&#39;Select&#39;,  fields=[&#39;Major_Genre&#39;, &#39;MPAA_Rating&#39;],  init={&#39;Major_Genre&#39;: &#39;Drama&#39;, &#39;MPAA_Rating&#39;: &#39;R&#39;},  bind={&#39;Major_Genre&#39;: alt. binding_select(options=genres), &#39;MPAA_Rating&#39;: alt. binding_radio(options=mpaa)}) # scatter plot, modify opacity based on selectionalt. Chart(movies). mark_circle(). add_selection(  selection). encode(  x=&#39;Rotten_Tomatoes_Rating:Q&#39;,  y=&#39;IMDB_Rating:Q&#39;,  tooltip=&#39;Title:N&#39;,  opacity=alt. condition(selection, alt. value(0. 75), alt. value(0. 05)))    Example 2: Tooltips :       alt. Chart(movies). mark_circle(). add_selection(  alt. selection_interval(bind=&#39;scales&#39;, encodings=[&#39;x&#39;])). encode(  x=&#39;Rotten_Tomatoes_Rating:Q&#39;,  y=alt. Y(&#39;IMDB_Rating:Q&#39;, axis=alt. Axis(minExtent=30)), # use min extent to stabilize axis title placement  tooltip=[&#39;Title:N&#39;, &#39;Release_Date:N&#39;, &#39;IMDB_Rating:Q&#39;, &#39;Rotten_Tomatoes_Rating:Q&#39;]). properties(  width=600,  height=400)    Example 3: More Tooltips :       # select a point for which to provide details-on-demandlabel = alt. selection_single(  encodings=[&#39;x&#39;], # limit selection to x-axis value  on=&#39;mouseover&#39;, # select on mouseover events  nearest=True,  # select data point nearest the cursor  empty=&#39;none&#39;   # empty selection includes no data points)# define our base line chart of stock pricesbase = alt. Chart(). mark_line(). encode(  alt. X(&#39;date:T&#39;),  alt. Y(&#39;price:Q&#39;, scale=alt. Scale(type=&#39;log&#39;)),  alt. Color(&#39;symbol:N&#39;))alt. layer(  base, # base line chart    # add a rule mark to serve as a guide line  alt. Chart(). mark_rule(color=&#39;#aaa&#39;). encode(    x=&#39;date:T&#39;  ). transform_filter(label),    # add circle marks for selected time points, hide unselected points  base. mark_circle(). encode(    opacity=alt. condition(label, alt. value(1), alt. value(0))  ). add_selection(label),  # add white stroked text to provide a legible background for labels  base. mark_text(align=&#39;left&#39;, dx=5, dy=-5, stroke=&#39;white&#39;, strokeWidth=2). encode(    text=&#39;price:Q&#39;  ). transform_filter(label),  # add text labels for stock prices  base. mark_text(align=&#39;left&#39;, dx=5, dy=-5). encode(    text=&#39;price:Q&#39;  ). transform_filter(label),    data=stocks). properties(  width=700,  height=400)    Data Tables : You can display tables per the usual way in your blog:       movies = &#39;https://vega. github. io/vega-datasets/data/movies. json&#39;df = pd. read_json(movies)# display table with pandasdf[[&#39;Title&#39;, &#39;Worldwide_Gross&#39;,   &#39;Production_Budget&#39;, &#39;IMDB_Rating&#39;]]. head()           Title   Worldwide_Gross   Production_Budget   IMDB_Rating         0   The Land Girls   146083. 0   8000000. 0   6. 1       1   First Love, Last Rites   10876. 0   300000. 0   6. 9       2   I Married a Strange Person   203134. 0   250000. 0   6. 8       3   Let's Talk About Sex   373615. 0   300000. 0   NaN       4   Slam   1087521. 0   1000000. 0   3. 4     Images : Local Images : You can reference local images and they will be copied and rendered on your blog automatically.  You can include these with the following markdown syntax: ![](my_icons/fastai_logo. png) Remote Images : Remote images can be included with the following markdown syntax: ![](https://image. flaticon. com/icons/svg/36/36686. svg) Animated Gifs : Animated Gifs work, too! ![](https://upload. wikimedia. org/wikipedia/commons/7/71/ChessPawnSpecialMoves. gif) Captions : You can include captions with markdown images like this: ![](https://www. fast. ai/images/fastai_paper/show_batch. png  Credit: https://www. fast. ai/2020/02/13/fastai-A-Layered-API-for-Deep-Learning/ ) Other Elements Tweetcards : Typing &gt; twitter: https://twitter. com/jakevdp/status/1204765621767901185?s=20 will render this:  Altair 4. 0 is released! https://t. co/PCyrIOTcvvTry it with: pip install -U altairThe full list of changes is at https://t. co/roXmzcsT58 . . . read on for some highlights. pic. twitter. com/vWJ0ZveKbZ &mdash; Jake VanderPlas (@jakevdp) December 11, 2019 Youtube Videos : Typing &gt; youtube: https://youtu. be/XfoYk_Z5AkI will render this:   Boxes / Callouts : Typing &gt; Warning: There will be no second warning! will render this:    Warning: There will be no second warning! Typing &gt; Important: Pay attention! It's important. will render this:    Important: Pay attention! It&#8217;s important. Typing &gt; Tip: This is my tip. will render this:    Tip: This is my tip. Typing &gt; Note: Take note of this. will render this:    Note: Take note of this. Typing &gt; Note: A doc link to [an example website: fast. ai](https://www. fast. ai/) should also work fine. will render in the docs:    Note: A doc link to an example website: fast. ai should also work fine. Footnotes : You can have footnotes in notebooks just like you can with markdown. For example, here is a footnote 1. This is the footnote. &#8617; "
    }, {
    "id": 7,
    "url": "https://dgunning.github.io/markdown/2020/01/14/test-markdown-post.html",
    "title": "Example Markdown Post",
    "body": "2020/01/14 - Basic setup: Jekyll requires blog post files to be named according to the following format: YEAR-MONTH-DAY-filename. md Where YEAR is a four-digit number, MONTH and DAY are both two-digit numbers, and filename is whatever file name you choose, to remind yourself what this post is about. . md is the file extension for markdown files. The first line of the file should start with a single hash character, then a space, then your title. This is how you create a “level 1 heading” in markdown. Then you can create level 2, 3, etc headings as you wish but repeating the hash character, such as you see in the line ## File names above. Basic formatting: You can use italics, bold, code font text, and create links. Here’s a footnote 1. Here’s a horizontal rule: Lists: Here’s a list:  item 1 item 2And a numbered list:  item 1 item 2Boxes and stuff:  This is a quotation    You can include alert boxes…and…    You can include info boxesImages: Code: You can format text and code per usual General preformatted text: # Do a thingdo_thing()Python code and output: # Prints '2'print(1+1)2Formatting text as shell commands: echo  hello world . /some_script. sh --option  value wget https://example. com/cat_photo1. pngFormatting text as YAML: key: value- another_key:  another value Tables:       Column 1   Column 2         A thing   Another thing   Tweetcards: Altair 4. 0 is released! https://t. co/PCyrIOTcvvTry it with: pip install -U altairThe full list of changes is at https://t. co/roXmzcsT58 . . . read on for some highlights. pic. twitter. com/vWJ0ZveKbZ &mdash; Jake VanderPlas (@jakevdp) December 11, 2019Footnotes:       This is the footnote.  &#8617;    "
    }];

var idx = lunr(function () {
    this.ref('id')
    this.field('title')
    this.field('body')
    this.metadataWhitelist = ['position']

    documents.forEach(function (doc) {
        this.add(doc)
    }, this)
});
function lunr_search(term) {
    document.getElementById('lunrsearchresults').innerHTML = '<ul></ul>';
    if(term) {
        document.getElementById('lunrsearchresults').innerHTML = "<p>Search results for '" + term + "'</p>" + document.getElementById('lunrsearchresults').innerHTML;
        //put results on the screen.
        var results = idx.search(term);
        if(results.length>0){
            //console.log(idx.search(term));
            //if results
            for (var i = 0; i < results.length; i++) {
                // more statements
                var ref = results[i]['ref'];
                var url = documents[ref]['url'];
                var title = documents[ref]['title'];
                var body = documents[ref]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><span class='body'>"+ body +"</span><br /><span class='url'>"+ url +"</span></a></li>";
            }
        } else {
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>No results found...</li>";
        }
    }
    return false;
}