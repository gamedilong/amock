import * as vscode from 'vscode';
import { AMock } from './amock/amock';
import { AMockTreeDataProvider } from './amock/amockTreeDataProvider'

export function activate(context: vscode.ExtensionContext) {

    const amockTreeDataProvider = new AMockTreeDataProvider("");
    context.subscriptions.push(vscode.window.registerTreeDataProvider("amock", amockTreeDataProvider));
	let amockApp = new AMock(null,null,null);

	let mockStart = vscode.commands.registerCommand('extension.amockStart', () => {
		amockApp.start();
	});
	context.subscriptions.push(mockStart);

	let mockStop = vscode.commands.registerCommand('extension.amockStop', () => {
		amockApp.stop();
	});
	context.subscriptions.push(mockStop);

	let mockReload = vscode.commands.registerCommand('extension.amockReload', () => {
		amockApp.reload();
	});
	context.subscriptions.push(mockReload);

	let openAmock = vscode.commands.registerCommand('extension.openAmock', (params) => {
		vscode.workspace.openTextDocument(params).then(
			document => vscode.window.showTextDocument(document)
		);
	});
	context.subscriptions.push(openAmock);

	vscode.workspace.onDidSaveTextDocument((e:vscode.TextDocument) =>{
		if(e.fileName && e.fileName.indexOf('.amock.js') > -1){
			amockTreeDataProvider.refresh();
		}
	})
}

export function deactivate() {}
