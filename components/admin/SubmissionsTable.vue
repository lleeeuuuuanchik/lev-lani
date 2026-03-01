<script setup>
/**
 * Таблица заявок на запись (админка).
 */

// props
defineProps({
	submissions: { type: Array, required: true },
});

const formatDate = (ts) =>
{
	if (!ts) return '—';
	return new Date(typeof ts === 'number' ? ts * 1000 : ts).toLocaleString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});
};
</script>

<template>
	<div class="sub-wrap">
		<table class="sub-table">
			<thead>
				<tr>
					<th>#</th>
					<th>Имя</th>
					<th>Телефон</th>
					<th>Услуга</th>
					<th>Сообщение</th>
					<th>Дата</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="sub in submissions" :key="sub.id">
					<td class="sub-table__id">{{ sub.id }}</td>
					<td class="sub-table__name">{{ sub.name }}</td>
					<td>
						<a :href="`tel:${sub.phone}`" class="sub-table__phone">
							{{ sub.phone }}
						</a>
					</td>
					<td>
						<span class="sub-table__badge">{{ sub.service }}</span>
					</td>
					<td class="sub-table__msg">{{ sub.message || '—' }}</td>
					<td class="sub-table__date">{{ formatDate(sub.createdAt) }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style lang="scss">
.sub-wrap
{
	overflow-x: auto;
}

.sub-table
{
	width: 100%;
	border-collapse: collapse;
	font-size: 0.88rem;
}

.sub-table thead tr
{
	border-bottom: 1px solid $border;
}

.sub-table th
{
	text-align: left;
	padding: 14px 18px;
	font-size: 0.72rem;
	font-weight: 600;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	color: $textMuted;
	white-space: nowrap;
}

.sub-table td
{
	padding: 14px 18px;
	border-bottom: 1px solid rgba(255,255,255,0.04);
	vertical-align: middle;
	color: $textSecondary;
}

.sub-table tbody tr
{
	@include transition();

	&:hover td
	{
		background: rgba(255,255,255,0.025);
		color: $textPrimary;
	}
}

.sub-table tbody tr:last-child td { border-bottom: none; }

.sub-table__id
{
	color: $textMuted;
	font-size: 0.78rem;
	font-variant-numeric: tabular-nums;
}

.sub-table__name
{
	font-weight: 500;
	color: $textPrimary;
}

.sub-table__phone
{
	color: $roseGold;
	text-decoration: none;
	font-weight: 500;
	@include transition();

	&:hover { color: $roseGoldLight; text-decoration: underline; }
}

.sub-table__badge
{
	display: inline-block;
	background: rgba(196,129,139,0.1);
	border: 1px solid rgba(196,129,139,0.2);
	color: $roseGoldLight;
	padding: 3px 10px;
	border-radius: 100px;
	font-size: 0.78rem;
	font-weight: 500;
	white-space: nowrap;
}

.sub-table__msg
{
	color: $textMuted;
	max-width: 220px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.sub-table__date
{
	color: $textMuted;
	white-space: nowrap;
	font-size: 0.8rem;
	font-variant-numeric: tabular-nums;
}
</style>
