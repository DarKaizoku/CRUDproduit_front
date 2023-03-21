import { SetStateAction } from 'react';
import { newProduit } from '../type/new.type';
import { TProduit } from '../type/produit.type';

const baseURL = 'http://localhost:8000/produits/';

export function AjouterProduit(props: {
	produit: TProduit[];
	setProduit: React.Dispatch<SetStateAction<TProduit[]>>;
	setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
	let newProduit: newProduit = {
		nom: '',
		prix: 0,
		quantite: 0,
	};

	const submitNew = (e: React.BaseSyntheticEvent) => {
		e.preventDefault();
		console.log(newProduit);
		if (
			!newProduit.nom ||
			!newProduit.prix ||
			!newProduit.quantite
		) {
			return alert(`n'oubliez rien !!`);
		}
		async function fetchData() {
			const response = await fetch(baseURL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newProduit),
			});

			const responseJson = await response.json();

			const newList: TProduit[] = [
				...props.produit,
				responseJson.data,
			];
			props.setPage('bouton');

			props.setProduit(newList);
			alert(responseJson.message);
		}
		fetchData();
	};

	return (
		<div className='border font-weight-normal mb-2'>
			<form>
				<div className='container text-start'>
					<div className='m-4'>
						<label
							htmlFor='basic-url'
							className='form-label'
						>
							Nom
						</label>
						<div className='input-group flex-nowrap'>
							<input
								onChange={(e) =>
									(newProduit.nom =
										e.target.value)
								}
								type='text'
								className='form-control'
								placeholder='Nom du produit'
								name='nom'
								aria-describedby='addon-wrapping'
								required
							/>
						</div>
					</div>
					<div className=' m-4'>
						<label
							htmlFor='basic-url'
							className='form-label'
						>
							Prix
						</label>
						<div className='input-group flex-nowrap'>
							<input
								onChange={(e) =>
									(newProduit.prix =
										parseInt(
											e
												.target
												.value
										))
								}
								type='text'
								className='form-control'
								placeholder='Prix du produit'
								name='prix'
								aria-describedby='addon-wrapping'
								required
							/>
						</div>
					</div>
					<div className='  m-4'>
						<label
							htmlFor='basic-url'
							className='form-label'
						>
							Quantité
						</label>
						<div className='input-group flex-nowrap'>
							<input
								onChange={(e) =>
									(newProduit.quantite =
										parseInt(
											e
												.target
												.value
										))
								}
								type='text'
								className='form-control'
								placeholder='Quantité du produit en stock'
								name='quantite'
								aria-describedby='addon-wrapping'
								required
							/>
						</div>
					</div>
					<div>
						<button
							onClick={(e) =>
								submitNew(e)
							}
							type='submit'
							className='btn btn-primary btn-md ms-4 mb-3'
						>
							Ajouter
						</button>

						<button
							onClick={(e) =>
								props.setPage(
									'bouton'
								)
							}
							type='button'
							className='btn btn-warning btn-md ms-4 mb-3'
						>
							Annuler
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}
