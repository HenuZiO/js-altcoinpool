function loadMinerGraph(minerData) {
	const minerInfo = minerData.performanceSamples;

	let labels = [];
	let minerHashRate = [];

	$.each(minerInfo, function (index, value) {
		if (labels.length === 0 || (labels.length + 1) % 4 === 1) {
			var createDate = convertUTCDateToLocalDate(
				new Date(value.created),
				false
			);
			labels.push(createDate.getHours() + ':00');
		} else {
			labels.push('');
		}
		var workerHashRate = 0;
		$.each(value.workers, function (index2, value2) {
			workerHashRate += value2.hashrate;
		});
		minerHashRate.push(workerHashRate);
	});

	var data = {
		labels: labels,
		series: [minerHashRate]
	};
	var options = {
		height: '200px',
		showArea: true,
		seriesBarDistance: 1,
		axisX: {
			showGrid: false
		},
		axisY: {
			offset: 47,
			labelInterpolationFnc: function (value) {
				return formatHash(value, 1, '');
			}
		},
		lineSmooth: Chartist.Interpolation.simple({
			divisor: 2
		})
	};
	var responsiveOptions = [
		[
			'screen and (max-width: 320px)',
			{
				axisX: {
					labelInterpolationFnc: function (value) {
						return value[0];
					}
				}
			}
		]
	];
	Chartist.Line(
		'.miners-hash__graphic-text--graph',
		data,
		options,
		responsiveOptions
	);
}
