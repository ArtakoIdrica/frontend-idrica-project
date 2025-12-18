
export default function CommentCard({commentUsername,commentBody}) {

    return(


        <div className="mt-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 mb-10 transition-colors">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-200">{commentUsername}</p>
                <p className="text-sm text-slate-700 mt-1.5 dark:text-slate-200">{commentBody}</p>
            </div>

        </div>
    );


    
}