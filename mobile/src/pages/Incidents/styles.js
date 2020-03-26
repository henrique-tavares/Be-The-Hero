import { StyleSheet } from 'react-native';
import Constatns from 'expo-constants';

export default StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24,
		paddingTop: Constatns.statusBarHeight + 20,
	},

	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	headerTextContainer: {
		flexDirection: 'row'
	},

	headerText: {
		fontSize: 15,
		color: '#737380'
	},
	
	headerTextBold: {
		fontSize: 15,
		color: '#737380',
		fontWeight: 'bold'
	},

	title: {
		fontSize: 30,
		marginBottom: 16,
		marginTop: 24,
		color: '#13131a',
		fontWeight: 'bold'	
	},

	description: {
		fontSize: 14,
		lineHeight: 24,
		color: '#737380'
	},

	incidentList: {
		marginTop: 20,
	},

	incident: {
		padding: 24,
		borderRadius: 8,
		backgroundColor: '#fff',
		marginBottom: 16,
	},

	incidentProperty: {
		fontSize: 13,
		color: '#41414d',
		fontWeight: 'bold'
	},

	incidentValue: {
		fontSize: 14,
		marginTop: 4,
		marginBottom: 20,
		color: '#737380'
	},

	detailsButton: {
		marginTop: 4,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	detailsButtonText: {
		fontSize: 14,
		color: '#e02041',
		fontWeight: 'bold'
	}
});
