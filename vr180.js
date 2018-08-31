function loadVr180Images(url) {
    return fetch(url).then(res => {
        return res.arrayBuffer();
    }).then(buf => {
        return new DataView(buf);
    }).then(data => {
        var soi = data.getUint16(0); 
        if (soi != 0xffd8) {
            throw Error("File is not a JPEG");
        }

        var blob = new Blob([new Uint8Array(data.buffer)],
            { type: "image/jpeg" });
        var urlCreator = window.URL || window.webkitURL;
        var leftImageUrl = urlCreator.createObjectURL(blob);

        var encoder = new TextEncoder;
        var decoder = new TextDecoder;
        var header = "http://ns.adobe.com/xmp/extension/";
        var enc = encoder.encode(header);
        var headerData = new Uint8Array(40);
        var rightdata = null;
        for (var marker, pos = 2; 
             pos < data.byteLength
             && (marker = data.getUint16(pos)) != 0xffda; ) {
            pos += 2;
            var seglen = data.getUint16(pos);
            var next = pos + seglen;
            if (marker == 0xffe1) {
                // APP1
                pos += 2;
                for (var idx = 0;
                     pos < data.byteLength
                     && idx < headerData.byteLength
                     && (headerData[idx++] = data.getUint8(pos++)) != 0; ) {
                     // do nothing
                }
                if (decoder.decode(headerData).indexOf(header) == 0) {
                    pos += 32;
                    var exlen = data.getUint32(pos);
                    pos += 4;
                    var exoff = data.getUint32(pos);
                    pos += 4;
                    if (rightdata === null) {
                        rightdata = new Uint8Array(exlen);
                    }
                    var len = seglen - 2 - header.length - 1 - 32 - 4 - 4;
                    rightdata.set(new Uint8Array(data.buffer.slice(pos, pos + len)), exoff);
                }
            }
            pos = next;
        }
        if (rightdata === null) {
            throw Error("no ext data");
        }
        var of = 0;
        var attrname = encoder.encode("GImage:Data=\"");
        for (var match = 0; of < rightdata.length && match < attrname.length; ) {
            if (rightdata[of++] != attrname[match++]) {
                match = 0;
            }
        }
        var eof = of;
        for (; eof < rightdata.length
               && rightdata[eof] != 0x22; ++eof) {}

        rightImageUrl = "data:image/jpeg;base64,"
            + decoder.decode(rightdata.slice(of, eof));
        return Array.of(leftImageUrl, rightImageUrl);
    });
}
