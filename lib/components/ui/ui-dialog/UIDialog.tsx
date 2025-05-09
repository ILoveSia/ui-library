//ui-library-lib-components-ui-ui-dialog-UIDialog.tsx

import { memo, useCallback, useState, useMemo, useEffect, useRef } from 'react';
import { XDialog, XDialogHeader, XDialogBody } from 'opus-x-react-assets';

const UIDialog = memo (({ msg, title, childKey, onHide, type } : any ) => {
	console.log(msg, title, childKey, onHide, type);
	const [show, setShow] = useState(false);
	const dialogfirstElementId = useRef('${childKey}_first_child');
	
	const handleIsClose = useCallback (
		(isOpen : boolean) => {
			console.log(isOpen);
			(window as any).$ui.dialog().innerClose(childKey);
			setShow(false);
			if (onHide) {
				onHide(show)
			}
		},
		[childKey, onHide, show],
	);
	
	// LSH - 오프캔버스 위에 모달 띄우는 케이스때문에 추가
	const setStyleAttribute = useMemo (() => {
		const styleObj = {
			zIndex : msg.zIndex ? msg.zIndex : '1055',
			overflow : show ? 'hidden' : 'visible',
		};
		return {
			style : styleObj,
		}
	}. []);
	
	const setDialogConfig = useCallback ( () => {
		setTimeout ( () => {
			const elem = document.getElementById ( dialogfirstElementId.current)?.parentElement as HTMLDivElement;
			if (elem && msg.width) {
				elem.style.width = msg.width;
			}
			if (elem && msg.height) {
				elem.style.overflow = 'hidden';
				elem.style.height = msg.height;
			}
		},10);		
	}, [dialogfirstElementId]);
	
	useEffect (() => {
		console.log('다이얼로그 로드 useEffect !!' , document.getElementsByTagName('body')[0]);
		setShow(true);
		if (show) {
			setDialogConfig();
		}		
	}, [show]);
	
	return (
		<XDialog
			open = {show}
			size = "small"
			content = "custom"
			backgroundOverlay = {false}
			alert = {false}
			{...setStyleAttribute}
			onOpenChange = {(open) => handleIsClose(open)}
		>
			<div
				style = {{ position : 'absolute' }}
				id = {dialogfirstElementId.current}
			/>
			<XDialogHeader
				title = {msg.title ? msg.title : title }
				showCloseButton
			/>
			<XDialogBody style = {{ overflow : 'auto' }}>{msg.element}</XDialogBody>
			{/*{msg.element ? (
				<XDialogBody>{msg.element}</XDialogBody>
			 ) : (
				<XDialogBody dangerouslySetInnerHTML = {{__html : msg }} />
			)}*/}
			{/*<XDialogFooter
					showPrimaryButton
					primaryButtonLabel = {'Button'}
					showSecondaryButton
					secondaryButtonLabel = {'Button'}
					showTertiaryButton
					tertiaryButtonLabel = {'Button'}
			/>*/}
			</XDialog>
	);
});
UIDialog.displayName = 'UIDialog';

export default UIDialog;

