<template>
    <table class="table-auto w-full border-collapse border border-slate-400">
        <thead>
            <tr>
                <th class="text-left">#</th>
                <th class="text-left">Vai trò</th>
                <th class="text-right">Chức năng</th>
                <th class="text-right">Lưu ý</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="text-left border border-slate-300">1</td>
                <td class="text-left border border-slate-300">Dân làng</td>
                <td class="text-left border border-slate-300">Dân làng không có chức năng đặc biệt nào ngoài vote sống hay chết</td>
                <td class="text-right border border-slate-300"></td>
            </tr>
            <tr>
                <td class="text-left border border-slate-300">2</td>
                <td class="text-left border border-slate-300">Ma sói</td>
                <td class="text-left border border-slate-300">Ma sói thức dậy mỗi đêm và đi săn cùng nhau</td>
                <td class="text-right border border-slate-300">Ma sói có thể vote giết đồng loại vào đêm</td>
            </tr>
            <tr>
                <td class="text-left border border-slate-300">3</td>
                <td class="text-left border border-slate-300">Bảo vệ</td>
                <td class="text-left border border-slate-300">Bảo vệ tỉnh dậy vào đêm và quyết định sẽ bảo vệ ai khỏi sói cắn đêm đó</td>
                <td class="text-right border border-slate-300">Không thể bảo vệ 1 người 2 đêm liên tiếp. Không thể bảo vệ người bị phù thủy dùng độc</td>
            </tr>
            <tr>
                <td class="text-left border border-slate-300">4</td>
                <td class="text-left border border-slate-300">Tiên tri</td>
                <td class="text-left border border-slate-300">Tiên tri tỉnh dậy vào đêm và soi xem ai là sói</td>
                <td class="text-right border border-slate-300"></td>
            </tr>
            <tr>
                <td class="text-left border border-slate-300">5</td>
                <td class="text-left border border-slate-300">Phù thủy</td>
                <td class="text-left border border-slate-300">Phù thủy có duy nhất 2 bình thuốc độc và giải, trong đêm phù thủy được quyền lựa chọn dùng thuốc nào</td>
                <td class="text-right border border-slate-300">Phù thủy có thể sử dụng 2 bình trong cùng 1 đêm. Sau khi đã sử dụng bình thuốc giải phù thủy không thể biết ai đã bị sói cắn đêm đó. Phù thủy có thể hạ độc bất chấp người đó đã được bảo vệ</td>
            </tr>
            <tr>
                <td class="text-left border border-slate-300">7</td>
                <td class="text-left border border-slate-300">Thợ săn</td>
                <td class="text-left border border-slate-300">Vào mỗi đêm, thợ săn ngắm bắn 1 người. Khi thợ săn chết người đó sẽ chết theo</td>
                <td class="text-right border border-slate-300">Khi thợ săn bị treo cổ, người bị ngắm sẽ chết theo. Thợ săn có thể chọn không ngắm ai trong đêm</td>
            </tr>
        </tbody>
    </table>
</template>