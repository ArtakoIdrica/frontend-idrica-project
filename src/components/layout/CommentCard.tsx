
export default function CommentCard({commentUsername,commentBody}) {

    return(


        <div className="mt-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <p className="text-xs font-medium text-slate-500">{commentUsername}</p>
                <p className="text-sm text-slate-700 mt-1.5">{commentBody}</p>
            </div>

        </div>
    );


    
}