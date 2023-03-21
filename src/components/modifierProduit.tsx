import { SetStateAction } from 'react';
import { TProduit } from '../type/produit.type';

const baseURL = 'http://localhost:8000/produits/';

export function ModifierProduit(props: {
	produit1: TProduit;
	produit: TProduit[];
	setProduit: React.Dispatch<SetStateAction<TProduit[]>>;
	setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
	let ProduitUpdated: TProduit = props.produit1;

	const update = async (e: React.BaseSyntheticEvent) => {
		e.preventDefault();
		if (
			!ProduitUpdated.nom ||
			!ProduitUpdated.prix ||
			!ProduitUpdated.quantite
		) {
			return alert(`n'oubliez rien !!`);
		}
		const data = await fetch(baseURL + props.produit1.id, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(ProduitUpdated),
		});

		const dataJson = await data.json();
		alert(dataJson.message);

		const ListwitoutUpdate = props.produit.filter(
			(data) => data.id !== ProduitUpdated.id
		);
		const newList = [...ListwitoutUpdate, dataJson.data];
		props.setProduit(newList);
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
								defaultValue={
									props
										.produit1
										.nom
								}
								onChange={(e) =>
									(ProduitUpdated.nom =
										e.target.value)
								}
								type='text'
								className='form-control'
								placeholder='Nom du produit'
								name='nom'
								aria-describedby='addon-wrapping'
								required={true}
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
								defaultValue={
									props
										.produit1
										.prix
								}
								onChange={(e) =>
									(ProduitUpdated.prix =
										parseInt(
											e
												.target
												.value
										))
								}
								type='text'
								className='form-control'
								placeholder='Nom du produit'
								name='prix'
								aria-describedby='addon-wrapping'
								required={true}
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
								defaultValue={
									props
										.produit1
										.quantite
								}
								onChange={(e) =>
									(ProduitUpdated.quantite =
										parseInt(
											e
												.target
												.value
										))
								}
								type='text'
								className='form-control'
								placeholder='Nom du produit'
								name='quantite'
								aria-describedby='addon-wrapping'
								required={true}
							/>
						</div>
					</div>
					<div>
						<button
							onClick={(e) =>
								update(e)
							}
							type='submit'
							className='btn btn-primary btn-md ms-4 mb-3'
						>
							Modifier
						</button>
						<button
							onClick={(e) =>
								props.setPage(
									'bouton'
								)
							}
							type='submit'
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
