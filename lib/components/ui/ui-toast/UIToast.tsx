//ui-library-lib-components-ui-ui-toast-UIToast.tsx

import { useEffect , forwardRef , useImperativeHandle, type CSSProperties } from 'react';
import { XToast, type XToastProps } from 'opus-x-react-assets';

interface IUIToastProps {
	className? : string;
	style? : CSSProperties;
	placement? : string;
	maxVisibleCount? : number;
	duration? : number;
}
type TUIToast = XToastProps & React.RefAttributes<HTMLDivElement> & IUIToastProps;

const UIToast : React.ForwardRefExoticComponent<TUIToast> = forwardRef<any, TUIToast> (
	({ className , style , placement = 'bottomCenter' , maxVisbleCount = 5, duration = 5000 } , ref : any ) : JSX.Element => {
		// UITextField의 외부노출 메서드 -------------------------
		useImperativeHandle( ref, () => {
			return {	
				focus : () => {
					console.log('call textfield focus!!!);
				},
			};
		});
		
		useEffect(() => {}, []);
		
		return (
			<XToast
				className = {className ? className : ''}
				style = {style ? style : {}}
				placement = {placement}
				maxVisibleCount = {maxVisibeCount}
				duration  = {duration}
			/>
		);	
	},
);

UIToast.displayName = 'UIToast';
export default UIToast;

