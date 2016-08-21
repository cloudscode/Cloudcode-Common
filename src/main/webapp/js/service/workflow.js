var WorkFlow = {
	manager : function(param) {
		Request.request('workflow-Task-manager', {
					data : {
						actionType : param.actionType || 'manager',
						taskId : param.id
					}
				}, function(result) {
					Dialog.open({
								width : $.hh.browser.getMainWidth() * 0.9,
								height : $.hh.browser.getMainHeight() * 0.85,
								url : 'jsp-workflow-service-servicemain',
								params : {
									actionType : param.actionType || 'manager',
									taskResult : result,
									callback : param.callback
								}
							});
				});
	},
	showpic : function(param) {
		$.hh.pagelist.callRow("pagelist", function(row) {
					Dialog.open({
								width : $.hh.browser.getMainWidth() * 0.9,
								height : $.hh.browser.getMainHeight() * 0.85,
								url : 'jsp-workflow-task-pipic?piid='
										+ param.piid + '&pdid=' + param.pdid
							});
				});
	}
}
var WF = {
	showForm : function(piid) {
		Request.request('wf-WFOper-showFormByPiid', {
					data : {
						piid : piid
					}
				}, function(result) {
					var href = Request.getHref(result.nodeMap.workflow.href, {
								type : 'workflow',
								objectId : result.hipi.serviceId,
								actionType : 'select'
							});
					$.hh.addTab({
								id : result.hipi.serviceId,
								text : '查看表单',
								src : href
							});
				});
	},
	manager : function(param) {
		Request.request('wf-WFOper-manager', {
					data : {
						taskId : param.id
					}
				}, function(result) {
					var params = {
						param : param,
						taskResult : result,
						callback : param.callback
					};
					// Dialog.open({
					// width : $.hh.browser.getMainWidth() * 0.9,
					// height : $.hh.browser.getMainHeight() * 0.85,
					// url : 'jsp-wf-task-servicemain',
					// params : params
					// });
					$.hh.addTab({
								params : params,
								id : param.id,
								text : '任务办理',
								src : 'jsp-wf-task-servicemain'
							});
				});
	},
	openSubmitPage : function(params) {
		var taskResult = params.taskResult;
		var callback = params.callback;
		if (taskResult.serviceObject) {
			Dialog.open({
						url : 'jsp-wf-task-tasksubmit',
						params : {
							taskResult : taskResult,
							callback : callback
						}
					});
		}
	},
	showpic : function(piid) {
		$.hh.addTab({
					id : piid,
					text : '流程图',
					src : 'jsp-wf-pi-pipic?piid=' + piid
				});
	}
}