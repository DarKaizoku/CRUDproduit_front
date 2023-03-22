import { SetStateAction, useState } from 'react';
import { TProduit } from '../type/produit.type';

const baseURL = 'http://localhost:8000/produits/';

export function ModifierProduit(props: {
	produit1: TProduit;
	produit: TProduit[];
	setProduit: React.Dispatch<SetStateAction<TProduit[]>>;
	setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
	let ProduitUpdated: TProduit = props.produit1;

	const [maj, setMaj] = useState<TProduit>(props.produit1);
	//fct de mise à jour de la donnée pour un produit selectionné
	async function update(e: React.BaseSyntheticEvent) {
		e.preventDefault();
		if (!maj.nom || !maj.prix || !maj.quantite) {
			return alert(`n'oubliez rien !!`);
		}
		const data = await fetch(baseURL + props.produit1.id, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(maj),
		});

		const dataJson = await data.json();
		alert(dataJson.message);

		const ListwitoutUpdate = props.produit.filter(
			(data) => data.id !== maj.id
		);
		const newList = [...ListwitoutUpdate, dataJson.data];
		props.setProduit(newList);
		props.setPage('bouton');
	}

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
									ProduitUpdated.nom
								}
								onChange={(e) =>
									setMaj({
										...maj,
										nom: e
											.target
											.value,
									})
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
									ProduitUpdated.prix
								}
								onChange={(
									e
								) => {
									setMaj({
										...maj,
										prix: +e
											.target
											.value,
									});
								}}
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
									ProduitUpdated.quantite
								}
								onChange={(e) =>
									setMaj({
										...maj,
										quantite: +e
											.target
											.value,
									})
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
							onClick={() => {
								console.log(
									props.produit1
								);
								props.setPage(
									'bouton'
								);
							}}
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
